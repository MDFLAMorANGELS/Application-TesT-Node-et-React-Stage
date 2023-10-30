import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import Logout from './Logout'

function Navbar() {

    const [user] = useAtom(userAtom);

    return (
        <nav className="navbar navbar-expand-lg bg-success" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    APPLICATION TEST
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
                                <li className="nav-item px-2">
                                    <Link className="nav-link" to="/">
                                        Accueil
                                    </Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link className="nav-link" to="/create">
                                        Vendre un objet
                                    </Link>
                                </li>
                                <Logout/>
                            </>
                        ) : (
                            <>
                                <li className="nav-item px-2">
                                    <Link className="nav-link" to="/">
                                        Connexion
                                    </Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link className="nav-link" to="/signup">
                                        Inscription
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