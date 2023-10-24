import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Signin() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className='d-flex justify-content-center align-items-center py-5'>
      <form onSubmit={handleSubmit}>
        <h2>CONNEXION</h2>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Email : </label>
          <input type="email" className='form-control' id="email" name="email" minLength={3}
            maxLength={30}
            aria-describedby="champs email"
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className='form-label'>Password : </label>
          <input type="password" className='form-control' id="password" name="password" minLength={3}
            maxLength={50}
            aria-describedby="champs password"
            placeholder='Mot de passe'
            value={password}
            onChange={handlePasswordChange}
            required />
        </div>
        <button type="submit" className='btn btn-primary mt-4'>Submit</button>
      </form>
    </div>

  );
}

export default Signin