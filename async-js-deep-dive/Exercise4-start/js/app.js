var MAINAPP = (function (nsp) {
  "use strict";

  let url = "https://jsonplaceholder.typicode.com/";

  /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    */
  let posts = fetch(url + "posts/").then((response1) => response1.json());
  // .then((posts) => (nsp.posts = posts))
  // .catch((err) => console.log(`Problem retrieving posts: ${err}`));

  let comments = fetch(url + "comments/").then((response2) => response2.json());
  // .then((comments) => (nsp.comments = comments))
  // .catch((err) => console.log(`Problem retrieving comments: ${err}`));

  let todos = fetch(url + "todos/").then((response3) => response3.json());
  // .then((todos) => (nsp.todos = todos))
  // .catch((err) => console.log(`Problem retrieving todos: ${err}`));

  Promise.all([posts, comments, todos])
    .then((data) => {
      [nsp.posts, nsp.comments, nsp.todos] = data;
    })
    .catch((err) => {
      console.log(`Problem retrieving ${err}`);
    });

  //public
  return nsp;
})(MAINAPP || {});
