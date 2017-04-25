var totalCredits = 0;
var totalGPAPoints = 0.0;
var courses;

/*function calculate() {
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
} */

function calculate(){
  var newGPAPoints = 0;
   for(let course in courses){
      var courseDropDown = document.getElementById(course);
      newGPAPoints += parseFloat(courseDropDown.options[courseDropDown.selectedIndex].value);
   }

  document.getElementById('creditName').innerHTML = ((totalGPAPoints + newGPAPoints) /totalCredits);
  //document.getElementById('creditName').innerHTML = newGPAPoints;

}

document.getElementById('do-submit').onclick = calculate;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getCurrentCourses") {
    courses  = request.source;
    var table = document.getElementById('courseTable');
    for(var course in courses){
        var row = table.insertRow();
        var courseNameCell = row.insertCell(0);
        var courseGradeCell = row.insertCell(1);

        courseNameCell.innerHTML = course;
       
        var courseGradeSelect = document.createElement("select");
        courseGradeSelect.id = course;
        courseGradeSelect.options.add(new Option("A", courses[course] * 4.0));
        courseGradeSelect.options.add(new Option("B+",courses[course] * 3.5));
        courseGradeSelect.options.add(new Option("B", courses[course] * 3.0));
        courseGradeSelect.options.add(new Option("C+",courses[course] * 2.5));
        courseGradeSelect.options.add(new Option("C",courses[course] * 2.0));
        courseGradeSelect.options.add(new Option("D",courses[course] * 1.0));
        courseGradeSelect.options.add(new Option("F",0));
        courseGradeCell.appendChild(courseGradeSelect);
    }
  }
  
  else if(request.action == "getTotalCredit")
    totalCredits = request.source;

  else if(request.action == "getTotalGPAValue")
    totalGPAPoints = request.source;
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