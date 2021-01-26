import { withRouter, Link } from 'react-router-dom';
import './Header.css'

const Header = props => {
    return (
        <header className='header-container'>
            <h1>MemeMountain</h1>
            { props.location.pathname !== '/'
                ? (
                    <nav>
                        <Link to='/dash' className='nav-links'>Dashboard</Link>
                        <Link to='/profile' className='nav-links'>Profile</Link>
                    </nav>
                )
                : null }
        </header>
    )
}

export default withRouter(Header)