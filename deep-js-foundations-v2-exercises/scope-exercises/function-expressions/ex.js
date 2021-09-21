function printRecords(recordIds) {
  if (Array.isArray(recordIds)) {
    let filteredStudents = recordIds.map(function getStudentById(id) {
      return studentRecords.find(function findStudenById(student) {
        return student.id == id ? student : undefined;
      });
    });
    return filteredStudents.sort(sortStudents).forEach(printStudentWithFormat);
  }
}

function paidStudentsToEnroll() {}

function remindUnpaid(recordIds) {
  // TODO
}

function sortStudents(studentA, studentB) {
  return studentA.name > studentB.name ? 1 : -1;
}
function printStudentWithFormat(student) {
  console.log(
    `${student.name} (${student.id}): ${student.paid ? "Paid" : "Not Paid"}`
  );
}
// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
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

// function printRecords(recordIds) {
//   const foundedStudents = recordIds.map(function eachStudent(id) {
//     return studentRecords.find(function getId(student) {
//       return student.id == id;
//     });
//   });
//   let sortedStudents = sortStudents(foundedStudents);
//   return sortedStudents.forEach(printStudentWithFormat);
// }

// function paidStudentsToEnroll() {
//   let paidStudents = studentRecords.filter(function (student) {
//     return currentEnrollment.includes(student.id) ? student : student.paid;
//   });
//   const sortedStudents = sortStudents(paidStudents);
//   sortedStudents.forEach(printStudentWithFormat);

//   let newIds = paidStudents.map(function getId(student) {
//     return student.id;
//   });
//   return newIds;
// }

// function remindUnpaid(recordIds) {
//   let filteredStudents;
//   if (Array.isArray(recordIds)) {
//     filteredStudents = studentRecords.filter(function getStudent(student) {
//       return recordIds.includes(student.id) && student;
//     });
//   }

//   printRecords(filteredStudents);
// }

// // ********************************

// var currentEnrollment = [410, 105, 664, 375];

// var studentRecords = [
//   { id: 313, name: "Frank", paid: true },
//   { id: 410, name: "Suzy", paid: true },
//   { id: 709, name: "Brian", paid: false },
//   { id: 105, name: "Henry", paid: false },
//   { id: 502, name: "Mary", paid: true },
//   { id: 664, name: "Bob", paid: false },
//   { id: 250, name: "Peter", paid: true },
//   { id: 375, name: "Sarah", paid: true },
//   { id: 867, name: "Greg", paid: false },
// ];

// printRecords(currentEnrollment);
// console.log("----");
// currentEnrollment = paidStudentsToEnroll();
// printRecords(currentEnrollment);
// console.log("----");
// remindUnpaid(currentEnrollment);

// /*
// 	Bob (664): Not Paid
// 	Henry (105): Not Paid
// 	Sarah (375): Paid
// 	Suzy (410): Paid
// 	----
// 	Bob (664): Not Paid
// 	Frank (313): Paid
// 	Henry (105): Not Paid
// 	Mary (502): Paid
// 	Peter (250): Paid
// 	Sarah (375): Paid
// 	Suzy (410): Paid
// 	----
// 	Bob (664): Not Paid
// 	Henry (105): Not Paid
// */
