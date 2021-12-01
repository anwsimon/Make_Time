//js doc for options.html, handles new color chosen by user with handleButtonClick, and for each of the colors in the preset array, creates a button with the handleButtonClick event listener

let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
  console.log('successfully set color')
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  //When using storage.sync, the stored data will automatically be synced to any Chrome browser that the user is logged into, provided the user has sync enabled. When Chrome is offline, Chrome stores the data locally. The next time the browser is online, Chrome syncs the data.
  chrome.storage.sync.get("color", (data) => {
    console.log('constructing')
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
