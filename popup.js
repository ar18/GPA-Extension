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
  if (request.action == "getCurrentCourses") {
    var courses  = request.source;
    var table = document.getElementById('courseTable');
    for(var course in courses){
        var col = table.insertRow();
        var courseNameCell = col.insertCell(0);
        var courseGradeCell = col.insertCell(1);

        courseNameCell.innerHTML = courses[course];
       
        var courseGradeSelect = document.createElement("select");
        courseGradeSelect.id = course;
        courseGradeSelect.options.add(new Option("A","4.0"));
        courseGradeSelect.options.add(new Option("B+","3.5"));
        courseGradeSelect.options.add(new Option("B","3.0"));
        courseGradeSelect.options.add(new Option("C+","2.5"));
        courseGradeSelect.options.add(new Option("C","2.0"));
        courseGradeSelect.options.add(new Option("D","1.0"));
        courseGradeSelect.options.add(new Option("F","0.0"));
        courseGradeCell.appendChild(courseGradeSelect);
    }
  }
});



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