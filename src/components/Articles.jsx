import React, { Component } from 'react';
import * as api from '../api';
import { isEqual } from 'lodash';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        return (
            <div className='articles'>
                {this.state.articles.sort((a, b) => { return moment.utc(b.created_at).diff(moment.utc(a.created_at)) }).map((article, index) => {
                    return (
                        <div className='article' key={index}>
                            <div className='votes'>
                                <NavLink to={`/articles/${article._id}?vote=up`}><i className="fas fa-arrow-circle-up"></i></NavLink>
                                <p className='vote'>{article.votes}</p>
                                <NavLink to={`/articles/${article._id}?vote=up`}><i className="fas fa-arrow-circle-down"></i></NavLink>
                            </div>
                            <div className='user'>
                                <img className='avatar' src={article.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                                <div>posted by <strong>{article.created_by.username}</strong> {moment(article.created_at).fromNow()}</div>
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
        )
    }

    componentDidMount = () => {
        this.fetchArticles()
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.match.params, prevProps.match.params)) {
            this.fetchArticles()
        }
    }

    fetchArticles = () => {
        const { topic } = this.props.match.params;
        topic ? api.fetchArticlesByTopic(topic)
            .then(articles => {
                this.setState({ articles })
            })
            .catch(console.log)
            : api.fetchArticles()
                .then(articles => {
                    this.setState({ articles })
                })
                .catch(console.log)
    }
}

export default Articles;