const URL = 'https://d-northcoders-news-api.herokuapp.com/api';
const errorCodes = [400, 404, 500];

export const fetchArticles = () => {
    return fetch(`${URL}/articles`)
        .then(buffer => buffer.json())
        .then(body => body.articlesWithComments)
}

export const fetchArticlesByTopic = (topic) => {
    return fetch(`${URL}/topics/${topic}/articles`)
        .then(buffer => {
            if (errorCodes.includes(buffer.status)) throw Error(buffer.statusText);
            else return buffer.json()
        })
        .then(body => body.articlesWithComments)
}

export const fetchArticleById = (articleId) => {
    return fetch(`${URL}/articles/${articleId}`)
        .then(buffer => {
            if (errorCodes.includes(buffer.status)) throw Error(buffer.statusText);
            else return buffer.json()
        })
        .then(body => body.article)
}

export const fetchCommentsForArticle = (articleId) => {
    return fetch(`${URL}/articles/${articleId}/comments`)
        .then(buffer => buffer.json())
        .then(body => {
            if (body.comments) return body.comments
        })
}

export const voteOnArticle = (id, direction, section) => {
    return fetch(`${URL}/${section}/${id}?vote=${direction}`, { method: 'put' });
}

export const addNewComment = (articleId, newComment) => {
    return fetch(`${URL}/articles/${articleId}/comments`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
    })
        .then(buffer => buffer.json())
        .then(body => body.comment_added)
}

export const getUserData = (username) => {
    return fetch(`${URL}/users/${username}`)
        .then(buffer => {
            if (errorCodes.includes(buffer.status)) throw Error(buffer.statusText);
            else return buffer.json()
        })
        .then(body => body.user)
}

export const deleteComment = (commentId) => {
    return fetch(`${URL}/comments/${commentId}`, { method: 'delete' })
        .then(buffer => buffer.json())
        .then(body => body.comment_deleted)
}

export const addNewArticle = (topic, newArticle) => {
    return fetch(`${URL}/topics/${topic}/articles`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle)
    })
        .then(buffer => buffer.json())
        .then(body => body.article_added)
}