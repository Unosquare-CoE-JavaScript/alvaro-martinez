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

function paidStudentsToEnroll() {
  let notYetUnrolled = studentRecords
    .filter(function notYetUnrolled(student) {
      if (!currentEnrollment.includes(student.id) && student.paid) {
        return student.id;
      }
    })
    .map(function getIds(student) {
      return student.id;
    });
  return [...currentEnrollment, ...notYetUnrolled];
}

function remindUnpaid(recordIds) {
  let remind = recordIds.filter(function getStudentById(id) {
    return studentRecords.find(function findStudentById(student) {
      if (student.id == id && !student.paid) {
        return student;
      }
    });
  });
  printRecords(remind);
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
