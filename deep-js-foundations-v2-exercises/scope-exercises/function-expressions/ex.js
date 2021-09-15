function printRecords(recordIds) {
				const foundedStudents = []
			if(Array.isArray(recordIds)){	
				recordIds.forEach(function eachStudent(id) {
								let foundedStudent = studentRecords.find(function getId(student){
												return student.id == id
								} )

								foundedStudents.push(foundedStudent)
				})		
			}

				let sortedStudents = sortStudents(foundedStudents) 
				return sortedStudents.forEach(function printStudentWithFormat(student){
								let {id,name,paid}  = student
								console.log(`${name} (${id}): ${paid ? 'Paid' : 'Not Paid'}`);
				})
}

function paidStudentsToEnroll() {

				let paidStudents = studentRecords.filter(function(student){
								return currentEnrollment.includes(student.id) ? student : student.paid
				})
				const sortedStudents = sortStudents(paidStudents)
				 sortedStudents.forEach(function printStudentWithFormat(student){
								let {id,name,paid}  = student
								console.log(`${name} (${id}): ${paid ? 'Paid' : 'Not Paid'}`);
				})
				let newIds= paidStudents.map(function getId(student){
return student.id
				})
				console.log(newIds);
				return newIds
}

function remindUnpaid(recordIds) {
				let filteredStudents;
				console.log(recordIds);
				if(Array.isArray(recordIds)){
								 filteredStudents = studentRecords.filter(function getStudent(student){
												console.log(student);
												return recordIds.includes(student.id)  && student
								})

				}

				printRecords(filteredStudents)
}


function sortStudents (students) {
				return students.sort(function compareStudent(studentA,studentB){
								return studentA.name > studentB.name ? 1: -1
				})
}
// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----",);
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
