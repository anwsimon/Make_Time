//this resets when the extension is first installed, when the extension is updated to a new version, or when Chrome is updated to a new version.
let volunteerStatus = true
let color = "#add677"

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  chrome.storage.sync.set({ volunteerStatus });
  if (volunteerStatus === true){
    console.log('your volunteer status is active')
  } else {
    console.log('you are not volunteering right now')
  }
})
