const URL = 'https://d-northcoders-news-api.herokuapp.com/api';
const axios = require('axios');

export const fetchArticles = () => {
   return fetch(`${URL}/articles`)
    .then(buffer => buffer.json()) 
    .then(body => body.articlesWithComments)
}

export const fetchArticlesByTopic = (topic) => {
   return fetch(`${URL}/topics/${topic}/articles`)
    .then(buffer => buffer.json()) 
    .then(body => body.articlesWithComments)
}

export const fetchArticleById = (articleId) => {
    return fetch(`${URL}/articles/${articleId}`)
    .then(buffer => buffer.json()) 
    .then(body => body.article)
}

export const fetchCommentsForArticle = (articleId) => {
    return fetch(`${URL}/articles/${articleId}/comments`)
    .then(buffer => buffer.json()) 
    .then(body => body.comments)
}

export const voteOnArticle = (id, direction, section) => {
    return axios.put(`${URL}/${section}/${id}?vote=${direction}`);
}