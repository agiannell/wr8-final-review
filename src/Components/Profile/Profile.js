import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer';
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            editView: false
        }
    }

    handleInput = (e) => {
        this.setState({ username: e })
    }

    handleEditView = () => {
        this.setState({ editView: !this.state.editView })
    }

    updateUsername = () => {
        axios.put(`/api/user/${this.props.user.user_id}`, { username: this.state.username })
            .then(res => {
                this.props.getUser(res.data[0]);
                this.handleEditView();
                this.setState({username: ''});
            })
            .catch(err => console.log(err));
        }
        
        handleLogout = () => {
            axios.get('/auth/logout')
            .then(() => {
                this.props.clearUser();
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.props)
        return (
            <section className='profile-container'>
                <h1>Hey look, it's you!</h1>
                <img src={ this.props.user.profile_pic } alt={ this.props.user.username } className='profile-img' />
                { !this.state.editView
                    ? (
                        <>
                            <h2>{ this.props.user.username }</h2>
                            <button onClick={ this.handleEditView }>Edit Username</button>
                        </>
                    )
                    : (
                        <div>
                            <input
                                value={ this.state.username }
                                placeholder='New Username'
                                onChange={ e => this.handleInput(e.target.value) } />
                            <button onClick={ this.updateUsername } id='edit-btn'>Submit</button>
                        </div>
                    ) }
                    <h2>{ this.props.user.email }</h2>
                    <button onClick={ this.handleLogout }>Logout</button>
            </section>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Profile)