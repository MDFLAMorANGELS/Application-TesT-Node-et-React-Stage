import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Logout from './Logout'

function Navbar() {

    const [user] = useAtom(userAtom);

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Twitter
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        {user.isLogged ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">
                                        Home
                                    </Link>
                                </li>
                                <Logout />
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">
                                        Sign in
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;