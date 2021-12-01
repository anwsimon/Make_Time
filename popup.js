const changeColor = document.getElementById("changeColor");

//handles the right color showing up in the popup window
chrome.storage.sync.get(["volunteerStatus", "color"], ({ volunteerStatus, color }) => {
  if (volunteerStatus === true){
    changeColor.style.backgroundColor = color;
  } else {
    changeColor.style.backgroundColor = "#FFFFFF";
    console.log("we're here")
  }
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
