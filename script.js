// const inputForm = document.getElementById("input-form");
// const inputUrl = document.getElementById("input-url");
// const submitBtn = document.getElementById("submit-btn");
// const errorSpan = document.getElementById("error-span");
// const parentElement = document.querySelector(".parent-element");
// const copyButtons = document.querySelectorAll(".btn-copy");

// inputForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   let links = localStorage.getItem("links");
//   if (!links) links = [];
//   else links = JSON.parse(links);

//   const inputUrlValue = inputUrl.value.trim();
//   console.log(inputUrlValue);
//   if (inputUrlValue !== "") {
//     const response = await fetch(
//       `https://api.shrtco.de/v2/shorten?url=${inputUrlValue}`,
//       {
//         method: "POST",
//       }
//     );
//     const json = await response.json();
//     const shortLink = json.result.full_short_link;
//     console.log(json);
//     const childElement = document.createElement("div");
//     childElement.classList.add("link-container");
//     childElement.innerHTML = `
//           <div class="url">
//             <p>${inputUrlValue}</p>
//           </div>
//           <div class="shortened-url">
//             <p>${shortLink}</p>
//             <button class="btn-copy">Copy</button>
//           </div>
//     `;
//     parentElement.appendChild(childElement);
//     inputUrl.value = "";

//     let obj = {
//       inputUrlValue,
//       shortLink,
//     };

//     links.push(obj);

//     localStorage.setItem("links", JSON.stringify(links));

//     const copyButtons = childElement.querySelectorAll(".btn-copy");
//     copyButtons.forEach((copyBtn) => {
//       copyBtn.addEventListener("click", () => {
//         console.log("click");
//         // copy functionality
//         const textToCopy = copyBtn.previousElementSibling.textContent;
//         navigator.clipboard
//           .writeText(textToCopy)
//           .then(() => {
//             // copy success
//             copyBtn.classList.remove("btn-copy");
//             copyBtn.classList.add("btn-copied");
//             copyBtn.innerText = "Copied!";

//             // Add a transition effect
//             copyBtn.style.transition = "all 0.3s ease-in-out";
//             copyBtn.style.transform = "scale(1.1)";

//             setTimeout(() => {
//               copyBtn.innerText = "Copy";

//               // Change the Scale back to 1
//               copyBtn.style.transition = "all 0.3s ease-in-out";
//               copyBtn.style.transform = "scale(1)";

//               copyBtn.classList.remove("btn-copied");
//               copyBtn.classList.add("btn-copy");
//             }, 2000);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       });
//     });
//   } else {
//     setTimeout(() => {
//       inputUrl.classList.remove("error");
//       errorSpan.classList.remove("error-message");
//     }, 3000);
//     inputUrl.classList.add("error");
//     errorSpan.classList.add("error-message");
//   }
// });

// function renderSavedLinks() {
//   const links = JSON.parse(localStorage.getItem("links"));
//   if (links) {
//     let childElement;
//     console.log(links);
//     links.forEach((link) => {
//       childElement = document.createElement("div");
//       childElement.classList.add("link-container");
//       childElement.innerHTML = `
//               <div class="url">
//                 <p>${link.inputUrlValue}</p>
//               </div>
//               <div class="shortened-url">
//                 <p>${link.shortLink}</p>
//                 <button class="btn-copy">Copy</button>
//               </div>`;
//       parentElement.appendChild(childElement);
//     });

//     const copyButtons = childElement.querySelectorAll(".btn-copy");
//     copyButtons.forEach((copyBtn) => {
//       copyBtn.addEventListener("click", () => {
//         console.log("click");
//         // copy functionality
//         const textToCopy = copyBtn.previousElementSibling.textContent;
//         navigator.clipboard
//           .writeText(textToCopy)
//           .then(() => {
//             // copy success
//             copyBtn.classList.remove("btn-copy");
//             copyBtn.classList.add("btn-copied");
//             copyBtn.innerText = "Copied!";

//             // Add a transition effect
//             copyBtn.style.transition = "all 0.3s ease-in-out";
//             copyBtn.style.transform = "scale(1.1)";

//             setTimeout(() => {
//               copyBtn.innerText = "Copy";

//               // Change the Scale back to 1
//               copyBtn.style.transition = "all 0.3s ease-in-out";
//               copyBtn.style.transform = "scale(1)";

//               copyBtn.classList.remove("btn-copied");
//               copyBtn.classList.add("btn-copy");
//             }, 2000);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       });
//     });
//   }
// }

// window.addEventListener("load", renderSavedLinks);

// Get DOM elements
const inputForm = document.getElementById("input-form");
const inputUrl = document.getElementById("input-url");
const parentElement = document.querySelector(".parent-element");
const errorSpan = document.getElementById("error-span");
const navBtn = document.getElementById("nav-btn");

// Hambergur menu
navBtn.addEventListener("click", () => {
  console.log("click");
  const mobileNav = document.getElementById("mobile-nav");
  mobileNav.classList.toggle("show-navbar");
});

// Add submit event listener to the input form
inputForm.addEventListener("submit", handleSubmit);

// Function to handle form submission
async function handleSubmit(e) {
  e.preventDefault();

  const inputUrlValue = inputUrl.value.trim();
  if (inputUrlValue === "") {
    handleInputError();
    return;
  }

  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${inputUrlValue}`,
      {
        method: "POST",
      }
    );
    const { result } = await response.json();
    const shortLink = result.full_short_link;

    // Create link container element
    const linkContainer = createLinkContainer(inputUrlValue, shortLink);

    // Append link container element to the parent element
    parentElement.appendChild(linkContainer);

    // Clear input field
    inputUrl.value = "";

    // Save link to local storage
    saveLink(inputUrlValue, shortLink);
  } catch (error) {
    console.log(error);
  }
}

// Function to handle input error
function handleInputError() {
  inputUrl.classList.add("error");
  errorSpan.classList.add("error-message");
  setTimeout(() => {
    inputUrl.classList.remove("error");
    errorSpan.classList.remove("error-message");
  }, 3000);
}

// Function to create a link container element
function createLinkContainer(inputUrlValue, shortLink) {
  const linkContainer = document.createElement("div");
  linkContainer.classList.add("link-container");
  linkContainer.innerHTML = `
    <div class="url">
      <p>${inputUrlValue}</p>
    </div>
    <div class="shortened-url">
      <p>${shortLink}</p>
      <button class="btn-copy">Copy</button>
    </div>`;

  const copyButton = linkContainer.querySelector(".btn-copy");

  // Add click event listener to the copy button
  copyButton.addEventListener("click", handleCopy);

  return linkContainer;
}

// Function to handle copying the link
function handleCopy() {
  const copyButton = this;
  const textToCopy = copyButton.previousElementSibling.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyButton.classList.add("btn-copied");
      copyButton.innerText = "Copied!";

      // Add transition effect
      copyButton.style.transition = "all 0.3s ease-in-out";
      // copyButton.style.transform = "scale(1.1)";

      setTimeout(() => {
        copyButton.innerText = "Copy";

        // Reset transition and scale
        copyButton.style.transition = "all 0.3s ease-in-out";
        // copyButton.style.transform = "scale(1)";

        copyButton.classList.remove("btn-copied");
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to save link to local storage
function saveLink(inputUrlValue, shortLink) {
  let links = localStorage.getItem("links");
  if (!links) {
    links = [];
  } else {
    links = JSON.parse(links);
  }

  const linkObject = {
    inputUrlValue,
    shortLink,
  };

  links.push(linkObject);
  localStorage.setItem("links", JSON.stringify(links));
}

// Function to render saved links from local storage
function renderSavedLinks() {
  const links = JSON.parse(localStorage.getItem("links"));
  if (links) {
    links.forEach((link) => {
      const { inputUrlValue, shortLink } = link;
      const linkContainer = createLinkContainer(inputUrlValue, shortLink);
      parentElement.appendChild(linkContainer);
    });
  }
}

// Load saved links on window load
window.addEventListener("load", renderSavedLinks);
