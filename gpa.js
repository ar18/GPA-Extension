function getTotalCredit(){
	var GPA_tables = document.getElementByClassName('DeAcDataGridItemB');

	var  = 0;
	var totalCredit = 0;
	for(let row of GPA_tables){
		if(row.cells[4].innerHTML.childNodes[0].innerHTML == '')
			totalCredit += parseFloat(row.cells[2].innerHTML);
	}

	return totalCredit;
}

function getTotalGPAValue(){
	var GPA_tables = document.getElementByClassName('DeAcDataGridItemB');

	var  = 0;
	var currentValue = 0;
	for(let row of GPA_tables){
		if(row.cells[4].innerHTML.childNodes[0].innerHTML == '')
			currentValue += parseFloat(row.cells[2].innerHTML) * getValue(row.cells[2].innerHTML);
	}

	return currentValue;
}

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