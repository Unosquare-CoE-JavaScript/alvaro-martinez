var MAINAPP = (function (nsp) {
  "use strict";
  const API = "https://jsonplaceholder.typicode.com/";

  let posts = [],
    comments = [],
    todos = [];

  /*
    This IIFE is the start of an application. 
    The first thing we want to do is download all the posts,
     comments and todos so that we can work with them. Add the 
     code in order to do that. Also, make sure that you add the posts, 
     comments and todos to the MAINAPP variable so they are accessible 
     outside this function (e.g. nsp.posts = posts & return nsp). Because the code is asynchronous, 
     you will need to consider the best way to do that.
    */

  fetch(API + "posts")
    .then((resP) => resP.json())
    .then((posts) => {
      nsp.posts = posts;
    });

  fetch(API + "comments")
    .then((resC) => resC.json())
    .then((comments) => {
      nsp.comments = comments;
    });

  fetch(API + "todos")
    .then((resT) => resT.json())
    .then((todos) => {
      nsp.todos = todos;
    });

  //public

  return nsp;
})(MAINAPP || {});
