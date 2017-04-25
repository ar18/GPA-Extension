function getTotalCredit(){
	var GPA_tables = document.getElementsByClassName('DeAcDataGridItemB');
	var totalCredit = 0.0;
		for(let row of GPA_tables){
			//return row.cells[4].innerHTML.length;
		if(row.cells[4].innerHTML.length == 87)
			totalCredit += parseFloat(row.cells[2].innerHTML);
		else
			totalCredit += 0;
	}

	return totalCredit;
}

function getTotalGPAValue(){
	var GPA_tables = document.getElementsByClassName('DeAcDataGridItemB');
	var currentValue = 0.0;
	for(let row of GPA_tables){
		if(row.cells[4].innerHTML.length == 87  && row.cells[3].innerHTML != 'current')
			currentValue += parseFloat(row.cells[2].innerHTML) * getValue(row.cells[3].innerHTML);
	}

	return currentValue;
}

function getCurrentCourses(){
	var GPA_tables = document.getElementsByClassName('DeAcDataGridItemB');
	var current = [];

	for(let row of GPA_tables){
		if(row.cells[4].innerHTML.length == 87 && row.cells[3].innerHTML == 'current')
			current.push(row.cells[1].children[0].innerHTML);
	}
	return current;
	
}

/*	var GPA_tables = document.getElementsByClassName('DeAcDataGridItemB');

	var data = {};
	for(let row of GPA_tables){
		if(row.cells[4].innerHTML.length == 87 && row.cells[3].innerHTML == 'current')
			data[row.cells[1].children[0].innerHTML] = parseFloat(row.cells[2].innerHTML);
	}
	return data;
	
}*/

function getValue(letterGrade){
	switch(letterGrade){
		case 'A':
			return 4.0;
		case 'B+':
			return 3.5;
		case 'B':
			return 3.0;
		case 'C+':
			return 2.5;
		case 'C':
			return 2.0;
		case 'D':
			return 1.0;
		case 'F':
			return 0.0;
	}
}

chrome.runtime.sendMessage({
    action: "getCurrentCourses",
    source: getCurrentCourses()
});

chrome.runtime.sendMessage({
    action: "getTotalCredit",
    source: getTotalCredit()
});

chrome.runtime.sendMessage({
    action: "getTotalGPAValue",
    source: getTotalGPAValue()
});