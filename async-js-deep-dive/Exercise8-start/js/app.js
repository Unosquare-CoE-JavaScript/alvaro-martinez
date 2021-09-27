var MAINAPP = (function (nsp) {
  "use strict";

  let url = "https://jsonplaceholder.typicode.com/";

  /*
    Change this code to use async await. Make sure to use promise.all so that we await all three pieces of data without awaiting each individually which would take much longer.

    Which pattern do you prefer for this application? promises or async await?
    */
  (async function () {
    try {
      let posts = await fetch(url + "posts/").then((response1) =>
        response1.json()
      );

      let comments = await fetch(url + "comments/").then((response2) =>
        response2.json()
      );

      let todos = await fetch(url + "todos/").then((response3) =>
        response3.json()
      );

      let data = await Promise.all([posts, comments, todos]);

      nsp.posts = data[0];
      nsp.comments = data[1];
      nsp.todos = data[2];
    } catch (err) {
      console.log(`Problem retrieving data: ${err}`);
    }
  })();

  console.log("Remaining Code.");

  //public
  return nsp;
})(MAINAPP || {});
