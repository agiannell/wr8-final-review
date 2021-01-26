import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer';
import './Landing.css'

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            profilePic: '',
            registerView: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView })
    }

    handleRegister = () => {
        const { username, email, password, verPassword, profilePic } = this.state;

        if (password && password === verPassword) {
            axios.post('/auth/register', { username, email, password, profilePic })
                .then(res => {
                    this.props.getUser(res.data);
                    this.props.history.push('/dash');
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords don't match")
        }
    }

    handleLogin = () => {
        const { email, password } = this.state

        axios.post('/auth/login', { email, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/dash')
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='landing-container'>
                <section className='authentication-info'>
                    <h1>Welcome to MemeMountain</h1>
                    {this.state.registerView
                        ? (
                            <>
                                <h3>Register Below</h3>
                                <input
                                    value={this.state.username}
                                    name='username'
                                    placeholder='Username'
                                    onChange={e => this.handleInput(e)} />
                            </>
                        )
                        : <h3>Login Below</h3>}
                    <input
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={e => this.handleInput(e)} />
                    <input
                        value={this.state.password}
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={e => this.handleInput(e)} />
                    {this.state.registerView
                        ? (
                            // can use empty tags
                            <>
                                <input
                                    value={this.state.verPassword}
                                    name='verPassword'
                                    type='password'
                                    placeholder='Password'
                                    onChange={e => this.handleInput(e)} />
                                <input
                                    value={this.state.profilePic}
                                    name='profilePic'
                                    placeholder='Profile Picture URL'
                                    onChange={e => this.handleInput(e)} />
                                <button onClick={this.handleRegister}>Register</button>
                                <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                            </>
                        )
                        : (
                            <>
                                <button onClick={this.handleLogin}>Login</button>
                                <p>Don't have an account? <span onClick={this.handleToggle}>Register Here</span></p>
                            </>
                        )}
                </section>
            </div>
        )
    }
}

export default connect(null, { getUser })(Landing);