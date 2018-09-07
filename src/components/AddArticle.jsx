import React, { Component } from 'react';
import * as api from '../api';

class AddArticle extends Component {
    state = {
        article_title: '',
        article_body: '',
        article_added: false
    }
 render() {
     return <div className='add_article'>
         <div>Add article to <strong>{this.props.topic}</strong> topic: </div>
         <label className='article_label'>Article title: </label><textarea wrap='soft' onChange={this.handleTitleInput} value={this.state.article_title} className='add_article_title'/><br/>
          <label className='article_label'>Article body: </label><textarea wrap='soft' onChange={this.handleInput} value={this.state.article_body} className='add_article_body' /><br />
            {this.state.article_added ? <div className='comment_added' >Your article has been added</div> : null}
            <div><button onClick={this.addArticle} className='submit_comment'>Submit</button></div>
     </div>
 }

 handleInput = (event) => {
    this.setState({
        article_body: event.target.value
    })
}

handleTitleInput = (event) => {
    this.setState({
        article_title: event.target.value
    })
}

 addArticle = () => {
    if (this.state.article_body !== '' && this.state.article_title !== '') {
    api.getUserData(this.props.user)
        .then(user => {
            const newArticle = {
                title: this.state.article_title,
                body: this.state.article_body,
                created_by: user._id,
                belongs_to: this.props.topic
            }
            api.addNewArticle(this.props.topic, newArticle)
                .then((article) => {
                    this.setState({
                        article_added: true,
                        article_body: '',
                        article_title: ''
                    })
                    setTimeout(() => {
                        this.setState({
                            article_added: false
                        })
                    }, 3000)
                    this.props.saveNewArticle(article.data.article_added)
                })
        })
    }
}
}

export default AddArticle;