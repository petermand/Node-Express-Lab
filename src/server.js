const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

let postId = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
const handleUserError = (msg, res) => {
    res.status(STATUS_USER_ERROR).json(msg);
    return;
};

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const searchedPosts = posts.filter((post) => {
      return post.title.includes(term) || post.contents.includes(term);
    });
    res.json(searchedPosts);
  } else {
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return handleUserError({ error: 'Must Provide Post Title and Content' }, res);
  }
  const post = { id: postId, title, contents };
  posts.push(post);
  postId++;
  res.json(post);
});

module.exports = { posts, server };
