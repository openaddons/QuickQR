chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      chrome.tabs.create({ url: "https://openaddons.com/quickqr-from-url" });
    }
  });
  
  chrome.runtime.setUninstallURL("https://openaddons.com/extension-removed/");
  
 // chrome.runtime.onStartup.addListener(() => {
 //   chrome.tabs.create({ url: "https://mysite.com" });
 // });
  
 // chrome.runtime.onSuspend.addListener(() => {
 //   chrome.tabs.create({ url: "https://mysite.com" });
 // });
  