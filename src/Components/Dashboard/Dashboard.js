import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            postImage: ''
        }
    }

    getUserPosts = () => {
        axios.get(`/api/posts/${ this.props.user_id }`)
            .then(res => {
                this.setState({ posts: res.data })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getUserPosts();
    }

    handleInput = e => {
        this.setState({postImage: e})
    }

    createPost = () => {
        axios.post('/api/post', { id: this.props.user_id, postImage: this.state.postImage })
            .then(() => {
                this.getUserPosts();
                this.setState({postImage: ''});
            })
            .catch(err => console.log(err))
        }
        
    deletePost = (id) => {
        axios.delete(`/api/post/${id}`)
        .then(() => {
            this.getUserPosts();
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.props);
        console.log(this.state.posts);
        return (
            <section className='dashboard-container'>
                <input
                    value={ this.state.postImage }
                    placeholder='Add Image URL'
                    onChange={ e => this.handleInput(e.target.value) } />
                <button onClick={ this.createPost }>Add Post</button>
                <h1>Your Recent Posts</h1>
                <div className='post-flex'>
                    { this.state.posts.map(e => (
                        <div key={ e.post_id }>
                            <img src={ e.post_url } alt='MM user post' className='post-image' />
                            <button onClick={ () => this.deletePost(e.post_id) }>Delete</button>
                        </div>
                    )) }
                </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id
    }
}

export default connect(mapStateToProps)(Dashboard)