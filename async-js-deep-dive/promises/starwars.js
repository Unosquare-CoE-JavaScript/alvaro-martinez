const STARWAR_API = "https://swapi.dev/api/";

let swapi = function (num) {
  let API = STARWAR_API + "people/";

  fetch(`${API}${num}/`)
    .then((data) => {
      return data.json();
    })
    .then(function (obj) {
      console.log(obj);
      return fetch(obj.homeworld);
    })
    .then((hwd) => {
      return hwd.json();
    })
    .then((hw) => {
      console.log(hw);
    });
};

swapi(1);

console.log("other commands");
