const API = "https://jsonplaceholder.typicode.com/todos/"

fetch(API)
				.then(data =>data.json())
				.then(res =>console.log(res))
