import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Card from '../components/Card';

function Home() {
  const [email, setEmail] = useState(null);
  const [items, setItems] = useState([]);


  useEffect(() => {
    // Au chargement du composant, obtenez la valeur du cookie 'email' et stockez-la dans l'état.
    const emailFromCookie = Cookies.get('email');
    if (emailFromCookie) {
      setEmail(emailFromCookie);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    fetch("http://localhost:3000/api/stuff", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La requête a échoué");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des items:", error);
      });
  }, []);

  return (
    <>
  <h2 className='text-center'>PAGE D'ACCUEIL</h2>
  {email && <h3 className='text-center'>Bonjours  {email}</h3>}
  <div className="d-flex justify-content-around align-items-center flex-wrap py-5">
    {Array.isArray(items) && items.length > 0 ? (
      items.map((item) => (
        <Card key={item.id} item={item} items={items}/>
      ))
    ) : (
      <p>Aucun élément à afficher.</p>
    )}
  </div>
</>
  );
}

export default Home;
