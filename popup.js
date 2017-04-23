function calculate() {
  var grade = document.getElementById("gradeOp");
  var strUser = grade.options[grade.selectedIndex].value;
  if(strUser === 'A'){
    gpaInd = 4.0
  } else if (strUser === 'B+'){
    gpaInd = 3.5;
  } else if (strUser === 'B'){
    gpaInd = 3.0;
  } else if (strUser === 'C+'){
    gpaInd = 2.5;
  } else if (strUser === 'C'){
    gpaInd = 2.0;
  } else if (strUser === 'D'){
    gpaInd = 1.0;
  } else {
    gpaInd = 0;
  }
  document.getElementById('creditName').innerHTML = gpaInd;
}
document.getElementById('do-submit').onclick = calculate;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    document.getElementById('demo').textContent  = request.source;
  }
});


var a=0;
function count() {
    a++;
    document.getElementById('demo').textContent  = request.source[0];
   // document.getElementById('demo').textContent = a;
}
document.getElementById('do-count').onclick = count;

function onWindowLoad() {

  chrome.tabs.executeScript(null, {
    file: "gpa.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      document.getElementById('demo').textContent = 'There was an error : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;