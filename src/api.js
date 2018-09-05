const URL = 'https://d-northcoders-news-api.herokuapp.com/api';

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