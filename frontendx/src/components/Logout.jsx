import React from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../atom'
import Cookies from 'js-cookie';

export default function Logout(props) {
    const [, setUserState] = useAtom(userAtom)

    const handleLogout = () => {
        setUserState({ isLogged: false });
        Cookies.remove('token');
        Cookies.remove('id');
        Cookies.remove('email');
        console.log('vous etes déconnecter');
    };


    return (
        <a
            onClick={handleLogout}
            href="/signin"
            className="btn bg-danger"
        >
            Déconnexion
        </a>
    )
}