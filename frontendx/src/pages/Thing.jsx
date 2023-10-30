import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

export default function Thing() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [errorAuth, setErrorAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    const Navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`http://localhost:3000/api/stuff/${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La requête a échoué");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setItem(data[0]);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de l'item :", error);
                setError('L\'objet n\'existe pas');
                setLoading(false); 
            });
    }, [id]);

    const handleDelete = (e) => {
        e.preventDefault()

        const userId = Cookies.get('id');
        const thingAuthorId = item.userId;
        const thingId = item.id

        const token = Cookies.get('token');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, thingAuthorId }),
        };

        fetch(`http://localhost:3000/api/stuff/${thingId}`, requestOptions)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                console.log('Item deleted successfully.');
                Navigate('/');
            } else {
                setErrorAuth('Pas Authorisé');
                throw new Error('Failed to delete item.');
            }
        })
        .catch((error) => {
            console.error('Error when deleting the item:', error);
        });

    }

    const handleImageError = (e) => {
        e.target.src = 'https://i.pinimg.com/originals/0b/8c/08/0b8c081b7b05dcc0aad6238856ea87d2.gif';
        e.target.alt = 'Image de remplacement';
    };

    const localCreatedAt = moment(item.created_at).tz('Europe/Paris').add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');

    return (
        <>
            {loading ? ( 
                <div className="text-center mt-5">
                    Loading...
                </div>
            ) : (
                error ? (
                    <div className="alert alert-danger py-3" role="alert">
                        {error}
                    </div>
                ) : (
                    <>
                    {errorAuth && (
                        <div className="alert alert-danger py-3" role="alert">
                            {errorAuth}
                        </div>
                    )}
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className="card shadow my-2">
                            <img className="card-img-top" onError={handleImageError} src={item.imageUrl} alt="Photo de l'objet associé" />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.price} €</p>
                                <p className="card-text">Créé par {item.email} <br/> le {localCreatedAt}</p>
                            </div>
                            <button className='btn btn-success m-2'>Modifier</button>
                            <button onClick={handleDelete} className='btn btn-danger m-2'>Supprimer</button>
                        </div>
                    </div>
                    </>
                )
            )}
        </>
    );    
}

