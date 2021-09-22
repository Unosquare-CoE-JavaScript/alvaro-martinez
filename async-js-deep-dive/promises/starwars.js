const STARWAR_API = "https://swapi.dev/api/";

let swapi = function (num) {
  let API = STARWAR_API + "people/";

  fetch(`${API}${num}/`)
    .then((data) => {
      return data.json();
    })
    .then(function (obj) {
      console.log(obj);
    });
};

swapi(1)

console.log("other commands");
