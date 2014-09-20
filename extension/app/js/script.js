var hist;

$(document).ready(function() {
  hist = chrome.history.search({"text": "", "maxResults": 10000}, 
    function(historyItems) {
      alert(historyItems.length);
      console.log(JSON.stringify(historyItems));
    });
});
