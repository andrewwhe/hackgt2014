$("document").ready(function() {
  $("#app-button").click( function() {
    chrome.tabs.create({'url': chrome.extension.getURL('/app/index.html')})
  });
});

