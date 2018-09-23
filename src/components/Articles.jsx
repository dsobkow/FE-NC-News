import React, { Component } from 'react';
import * as api from '../api';
import { isEqual } from 'lodash';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Votes from './Votes';
import Error from './Error';

class Articles extends Component {
    state = {
        articles: [],
        hasError: false,
        error_message: ''
    }
    render() {
        const { topic } = this.props.match.params;
        const copyOfArticles = this.state.articles;
        return (
            <div>{this.state.hasError ? <Error message={this.state.error_message}/> :
                <div>{topic? <NavLink to={`/topics/${topic}/addarticle`}><button className='add_art_btn' onClick={this.showAddArticleForm}>Add new article</button></NavLink> : null}
               {this.state.articles.length !== 0 ? <div className='articles'>
                    {copyOfArticles.sort((a, b) => { return moment.utc(b.created_at).diff(moment.utc(a.created_at)) }).map(article => {
                        const body = article.body.slice(0, 100) + '...';
                        return (
                            <div className='article' key={article._id}>
                                <Votes obj={article} section='articles' />
                                <div className='user'>
                                    <img className='avatar' src={article.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                                    <div>posted by <NavLink className='user_link' to={`/users/${article.created_by.username}`}><strong>{article.created_by.username}</strong></NavLink> {moment(article.created_at).fromNow()}</div>
                                </div>
                                <div className='article_body'>
                                    <p><NavLink className='article_title' to={`/articles/${article._id}`}><strong><u>{article.title}</u></strong></NavLink></p>
                                    <p>{body}<NavLink className='article_title' to={`/articles/${article._id}`}><strong>READ MORE</strong></NavLink></p>
                                </div>
                                <p className='comment_count'>{article.comments} comments</p>
                                <p className='topic_info'>{article.belongs_to}</p></div>
                        )
                    })}
                </div> : <h1>Loading...</h1>}
            </div>}</div>
        )
    }

    componentDidMount = () => {
        this.fetchArticles()
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.match.params, prevProps.match.params)) {
            this.fetchArticles()
            this.setState({hasError: false})
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
                    this.setState({ articles })
                })
                .catch(err => {
                    this.setState({
                        hasError: true,
                        error_message: err.message
                    })
                })
    }
}

export default Articles;