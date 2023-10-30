import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [, setUserState] = useAtom(userAtom);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function resetForm() {
        setEmail('');
        setPassword('');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const userDataResponse = await response.json();
                console.log(userDataResponse);

                const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    Cookies.set('token', loginData.token);
                    Cookies.set('id', loginData.userID);
                    Cookies.set('email', loginData.email);
                    setUserState({ isLogged: true });
                    navigate('/')
                    resetForm()
                    console.log('Connexion réussie après inscription :', loginData);
                } else {
                    console.error('Échec de la connexion après inscription :', loginResponse);
                    setError('L\'adresse e-mail que vous avez fournie est déjà associée à un compte. Veuillez vous connecter ou utiliser une autre adresse e-mail.');
                    resetForm()
                }
            } else {
                console.error('Réponse non OK:', response);
                setError('Email ou mot de passe Incorrect');
                resetForm()
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError('Erreur de connexion au serveur. Veuillez vérifier votre connexion Internet.');
            resetForm()
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center py-5'>
            <form onSubmit={handleSubmit} className='bg-white p-5 rounded shadow'>
                <h2>INSCRIPTION</h2>
                {error && (
                    <div className="alert alert-danger py-3" role="alert">
                        {error}
                    </div>
                )}
                <div className="form-group my-2">
                    <label htmlFor="email" className='form-label'>Email : </label>
                    <input type="email" className='form-control' id="email" name="email" minLength={3}
                        maxLength={30}
                        aria-describedby="champs email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className='form-label'>Password : </label>
                    <input type="password" className='form-control' id="password" name="password" minLength={3}
                        maxLength={50}
                        aria-describedby="champs password"
                        placeholder='Mot de passe'
                        value={password}
                        onChange={handlePasswordChange}
                        required />
                </div>
                <button type="submit" className='btn btn-primary mt-4'>S'inscrire</button>
            </form>
        </div>

    );
}

export default Signup