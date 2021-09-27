const STARWAR_API = "https://swapi.dev/api/";

let swapiFilms = async function (num) {
  let API = STARWAR_API + "films/";
  let fimlsData;
  let films = [];

  fimlsData = await fetch(`${API}${num}/`).then((data) => {
    return data.json();
  });
  films = fimlsData.results.map((film) => film.title);
};

swapi(1);
