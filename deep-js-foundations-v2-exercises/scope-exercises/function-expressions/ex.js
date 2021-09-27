var printRecords = (recordIds) => {
  if (Array.isArray(recordIds)) {
    let filteredStudents = recordIds.map((id) => {
      return studentRecords.find((student) => {
        return student.id == id ? student : undefined;
      });
    });
    return filteredStudents.sort(sortStudents).forEach(printStudentWithFormat);
  }
};

var paidStudentsToEnroll = () => {
  let notYetUnrolled = studentRecords
    .filter((student) => {
      if (!currentEnrollment.includes(student.id) && student.paid) {
        return student.id;
      }
    })
    .map((student) => student.id);
  return [...currentEnrollment, ...notYetUnrolled];
};

var remindUnpaid = (recordIds) => {
  let remind = recordIds.filter((id) => {
    return studentRecords.find((student) => {
      if (student.id == id && !student.paid) {
        return student;
      }
    });
  });
  printRecords(remind);
};

var sortStudents = (studentA, studentB) =>
  studentA.name > studentB.name ? 1 : -1;

var printStudentWithFormat = (student) => {
  console.log(
    `${student.name} (${student.id}): ${student.paid ? "Paid" : "Not Paid"}`
  );
};
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
