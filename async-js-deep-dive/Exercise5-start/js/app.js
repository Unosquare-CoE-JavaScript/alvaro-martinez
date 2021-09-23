// Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts).
// Set up the function so you can pass in the userID and the function will
// assign only the posts for that user to a variable.
// The data should be stored in an array.
const API = "https://jsonplaceholder.typicode.com/";

async function getPostsById(id) {
  let posts = await fetch(API + "posts/").then((data) => data.json());
  return posts.filter((post) => post.userId == id);
}

getPostsById(1);
