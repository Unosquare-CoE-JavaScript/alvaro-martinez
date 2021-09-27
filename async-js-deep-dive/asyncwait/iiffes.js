(async function (id) {
  const API = "https://jsonplaceholder.typicode.com/";

  let posts = await fetch(API + "posts/").then((data) => data.json());
  return posts.filter((post) => post.userId == id);
})(1);
