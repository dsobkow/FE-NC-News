import React, { Component } from 'react';
import * as api from '../api';
import Error from './Error';
import { isEqual } from 'lodash';

class User extends Component {
    state = {
        user: {},
        article_count: 0,
        page_loaded: false,
        hasError: false,
        error_message: ''
    }
    render() {
        return <div>{this.state.hasError ? <Error message={this.state.error_message}/> : <div><div className='user_profile'><div>
        <img className='user_avatar' src={this.state.user.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
        <div className='profile_username'><strong>{this.state.user.username}</strong></div></div>
        <div className='profile_name'>name: {this.state.user.name}</div></div>
        <div>
        {this.state.page_loaded && this.state.article_count !== 0 ? <div className='user_activity'><h2>Activity</h2>
        <p>Posted articles: {this.state.article_count}</p></div> : this.state.page_loaded && this.state.article_count === 0 ? <div className='user_activity'><h2>No activity</h2></div> : null}
            </div></div>} </div>
    }

    componentDidMount() {
        this.getUserData()
        this.getArticleCount()
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.match.params, prevProps.match.params)) {
            this.getUserData()
            this.setState({hasError: false})
        }
    }

    getUserData = () => {
        api.getUserData(this.props.match.params.username)
        .then(user => {
            this.setState({ user })
        })
        .catch(err => {
            this.setState({
                hasError: true,
                error_message: err.message
            })
        })
    }

    getArticleCount = () => {
        let articleCount = 0;
        api.fetchArticles() 
        .then(articles => {
            articles.forEach(article => {
                if (article.created_by.username === this.props.match.params.username) {
                    articleCount++;
                }
            })
        })
        .then(() => this.setState({article_count: articleCount, page_loaded: true}))
    }

}

export default User;