var hist;

$(document).ready(function() {
  hist = chrome.history.search({"text": ""}, 
    function(historyItems) {
      alert(historyItems[0]["url"]);
      console.log(JSON.stringify(historyItems));
    });
});
