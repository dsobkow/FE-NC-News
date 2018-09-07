import React, { Component } from 'react';
import * as api from '../api';
import { isEqual } from 'lodash';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Votes from './Votes';
import AddArticle from './AddArticle';
import Error from './Error';

class Articles extends Component {
    state = {
        articles: [],
        voteChange: 0,
        add_article: false,
        hasError: false,
        error_message: ''
    }
    render() {
        const { topic } = this.props.match.params;
        return (
            <div>{this.state.hasError ? <Error message={this.state.error_message}/> :
                <div>{!this.state.add_article && topic? <button className='add_art_btn' onClick={this.showAddArticleForm}>Add new article</button> : null}
                {this.state.add_article && topic ? <AddArticle user={this.props.user} topic={topic} saveNewArticle={this.saveNewArticle} /> : null}
                <div className='articles'>
                    {this.state.articles.sort((a, b) => { return moment.utc(b.created_at).diff(moment.utc(a.created_at)) }).map((article, index) => {
                        return (
                            <div className='article' key={index}>
                                <Votes obj={article} section='articles' />
                                <div className='user'>
                                    <img className='avatar' src={article.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                                    <div>posted by <NavLink className='user_link' to={`/users/${article.created_by.username}`}><strong>{article.created_by.username}</strong></NavLink> {moment(article.created_at).fromNow()}</div>
                                </div>
                                <div className='article_body'>
                                    <p><NavLink className='article_title' to={`/articles/${article._id}`}><strong><u>{article.title}</u></strong></NavLink></p>
                                    <p>{article.body}</p>
                                </div>
                                <p className='comment_count'>{article.comments} comments</p>
                                <p className='topic_info'>{article.belongs_to}</p></div>
                        )
                    })}
                </div>
            </div>}</div>
        )
    }

    componentDidMount = () => {
        this.fetchArticles()
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.match.params, prevProps.match.params)) {
            this.fetchArticles()
            this.setState({add_article: false, hasError: false})
        }
    }

    fetchArticles = () => {
        const { topic } = this.props.match.params;
        topic ? api.fetchArticlesByTopic(topic)
            .then(articles => {
                this.setState({ articles })
            })
            .catch(err => {
                this.setState({
                    hasError: true,
                    error_message: err.message
                })
            })
            : api.fetchArticles()
                .then(articles => {
                    this.setState({ add_article: false, articles })
                })
                .catch(err => {
                    this.setState({
                        hasError: true,
                        error_message: err.message
                    })
                })
    }

    saveNewArticle = (article) => {
            this.setState({
                articles: [
                    ...this.state.articles,
                    article
                ]
            })
    }

    showAddArticleForm = () => {
        this.setState({ add_article: true })
    }
}

export default Articles;