import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import Comments from './Comments';

class Article extends Component {
    state = {
        article: {},
        page_loaded: false
    }

    render() {
       
        return <div><div>{this.state.page_loaded ?
            <div className='single_article' key={this.state.article._id}>
                <div className='votes'><i className="fas fa-arrow-circle-up"></i><p className='vote'>{this.state.article.votes}</p><i className="fas fa-arrow-circle-down"></i></div>
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
                {this.state.page_loaded ? <Comments articleId={this.state.article._id}/> : null}
                </div>
    }

    componentDidMount = () => {
        this.fetchArticle();
    }

    fetchArticle = () => {
        const { article_id } = this.props.match.params;
            api.fetchArticleById(article_id)
            .then(article => {
                this.setState({ 
                    page_loaded: true,
                    article })
            })
            .catch(console.log)
        }
}

export default Article;