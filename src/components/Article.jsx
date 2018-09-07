import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import Comments from './Comments';
import Votes from './Votes';
import AddComment from './AddComment';
import { isEqual } from 'lodash';

class Article extends Component {
    state = {
        article: {},
        page_loaded: false,
        comments: []
    }

    render() {
        return <div><div>{this.state.page_loaded ?
            <div className='single_article' key={this.state.article._id}>
                <Votes obj={this.state.article} section='articles' />
                <div className='user'>
                    <img className='avatar' src={this.state.article.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                    <div>posted by <strong>{this.state.article.created_by.username}</strong> {moment(this.state.article.created_at).fromNow()}</div>
                </div>
                <div className='article_body'>
                    <p className='single_article_title'><strong><u>{this.state.article.title}</u></strong></p>
                    <p>{this.state.article.body}</p>
                </div>
                <p className='comment_count'><strong>{this.state.article.comments} comments</strong></p>
                <p className='topic_info'>{this.state.article.belongs_to}</p></div> : null}</div>
            <AddComment saveNewComment={this.saveNewComment} user={this.props.user} articleId={this.state.article._id} />
            {this.state.page_loaded ? <Comments articleId={this.state.article._id} comments={this.state.comments} user={this.props.user} /> : null}
        </div>
    }

    componentDidMount = () => {
        this.fetchArticle();
        this.fetchComments();
    }

    fetchArticle = () => {
        const { article_id } = this.props.match.params;
        api.fetchArticleById(article_id)
            .then(article => {
                this.setState({
                    page_loaded: true,
                    article
                })
            })
            .catch(console.log)
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.newComment, prevProps.newComment)) {
            this.setState({
                ...this.state,
                comments: [
                    ...this.state.comments,
                    this.props.newComment
                ]
            })
        }
    }

    fetchComments = () => {
        const { article_id } = this.props.match.params;
        api.fetchCommentsForArticle(article_id)
            .then(comments => {
                this.setState({
                    comments
                })
            })
            .catch(console.log)
    }

    saveNewComment = (newComment) => {
        if (this.state.comments) {
            this.setState({
                comments: [...this.state.comments, newComment]
            })
        } else {
            this.setState({
                comments: [newComment]
            })
        }
    }
}

export default Article;