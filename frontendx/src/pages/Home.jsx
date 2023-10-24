import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Home() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Au chargement du composant, obtenez la valeur du cookie 'email' et stockez-la dans l'état.
    const emailFromCookie = Cookies.get('email');
    if (emailFromCookie) {
      setEmail(emailFromCookie);
    }
  }, []);

  return (
    <>
      <h1>PAGE D'ACCUEIL</h1>
      {email && <h3>Bonjours  {email}</h3>}
    </>
  );
}

export default Home;
