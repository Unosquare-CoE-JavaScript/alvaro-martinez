// TODO: write the validation functions

function isValidName(name) {
  if (typeof name === "string" && name.trim().length >= 3) {
    return true;
  }
  return false;
}

function hoursAttended(attended, length) {
  let matchCounter = 0;
  // console.log({ attended, length });
  if (typeof attended == "string") {
    attended = Number(attended);
  }
  if (typeof length === "string") {
    length = Number(length);
  }
  if (
    typeof attended === "number" &&
    typeof length === "number" &&
    attended > 0 &&
    length > 0 &&
    Number.isInteger(attended) &&
    Number.isInteger(length) &&
    attended <= length
  ) {
    return true;
  }
  return false;
  // if (!!attended || !!length) {
  //   return false;
  // }
  // if (
  //   !["number", "string"].includes(typeof attended) ||
  //   !["number", "string"].includes(typeof length)
  // ) {
  //   matchCounter++;
  // }
  // if (Number(attended) >= 0 && Number(length) >= 0) {
  //   matchCounter++;
  // }

  // if (Number(attended) <= Number(length)) {
  //   matchCounter++;
  // }
  // if (Number(attended) === Math.abs(Number(length))) {
  //   matchCounter++;
  // }
  // return matchCounter >= 2;
}
// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, "10") === true);
console.log(hoursAttended("6", 10) === true);
console.log(hoursAttended("6", "10") === true);
console.log("--------------");
console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);

console.log("--------------");
console.log(hoursAttended("", 6) === false);
console.log(hoursAttended(6, "") === false);
console.log(hoursAttended("", "") === false);
console.log(hoursAttended("foo", 6) === false);
console.log(hoursAttended(6, "foo") === false);
console.log(hoursAttended("foo", "bar") === false);

console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);

console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, "6") === false);
console.log(hoursAttended("10", 6) === false);
console.log(hoursAttended("10", "6") === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, "10.1") === false);
console.log(hoursAttended("6.1", 10) === false);
console.log(hoursAttended("6.1", "10.1") === false);
