import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate, Link } from 'react-router-dom';
import moment from 'moment-timezone';

export default function Thing() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [errorAuth, setErrorAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [showForm, setShowForm] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };


    const Navigate = useNavigate();

    function resetForm() {
        setTitle('');
        setDescription('');
        setPrice('');
        setImageUrl('');
    }

    useEffect(() => {
        const token = Cookies.get('token');
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
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


    const handleModifyClick = () => {
        if (showForm === false) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    };

    const handleModify = async (e) => {
        e.preventDefault();

        const thingId = item.id
        const thingAuthorId = item.userId;
        const userId = Cookies.get('id');

        const newTitle = title;
        const newDescription = description;
        const newImageUrl = imageUrl;
        const newPrice = price;

        const stuffData = {
            id: thingId,
            newTitle,
            newDescription,
            newImageUrl,
            newPrice,
            thingAuthorId,
            userId
        };

        const token = Cookies.get('token');
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stuffData),
        };

        fetch(`http://localhost:3000/api/stuff/${thingId}`, requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    console.log('Item Modify successfully.');
                    resetForm()
                    window.location.reload()
                } else {
                    setErrorAuth('Pas Authorisé');
                    resetForm()
                    throw new Error('Failed to Modify item.');
                }
            })
            .catch((error) => {
                setErrorAuth('La modification a échoué');
                resetForm()
                console.error('Error when Modify the item:', error);
            });
    }

    const handleImageError = (e) => {
        e.target.src = 'https://i.pinimg.com/originals/0b/8c/08/0b8c081b7b05dcc0aad6238856ea87d2.gif';
        e.target.alt = 'Image de remplacement';
    };

    const localCreatedAt = moment(item.created_at).tz('Europe/Paris').add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');

    return (
        <div className='d-flex flex-column flex-lg-row justify-content-around align-items-center'>
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

                            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                                {errorAuth && (
                                    <div className="alert alert-danger py-3" role="alert">
                                        {errorAuth}
                                    </div>
                                )}
                                <div className="card shadow my-2">
                                    <img className="card-img-top" onError={handleImageError} src={item.imageUrl} alt="Photo de l'objet associé" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">{item.price} €</p>
                                        <p className="card-text">Créé par {item.email} <br /> le {localCreatedAt}</p>
                                    </div>
                                    {Cookies.get('id') == item.userId ? (
                                        <>
                                            <div className='text-decoration-none text-white btn btn-success m-2 ' onClick={handleModifyClick}>
                                                Modifier
                                            </div>
                                            <button onClick={handleDelete} className='btn btn-danger m-2'>Supprimer</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className='text-decoration-none text-white btn btn-success m-2 disabled' onClick={handleModifyClick} disabled>
                                                Modifier
                                            </div>
                                            <button onClick={handleDelete} className='btn btn-danger m-2 disabled' disabled>Supprimer</button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {showForm && (
                                <div className='d-flex justify-content-center align-items-center py-5'>
                                    <form onSubmit={handleModify} className='bg-white p-5 rounded shadow'>
                                        <h2>Modifier l' article</h2>
                                        {error && (
                                            <div className="alert alert-danger py-3" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        <div className="form-group my-2">
                                            <label htmlFor="titre" className='form-label'>Titre : </label>
                                            <input type="text" className='form-control' id="titre" name="titre" minLength={3}
                                                maxLength={50}
                                                aria-describedby="champs titre"
                                                placeholder='Titre'
                                                value={title}
                                                onChange={handleTitleChange}
                                                required />
                                        </div>
                                        <div className="form-group my-2">
                                            <label htmlFor="description" className='form-label'>Description : </label>
                                            <textarea type="text" className='form-control' id="description" name="description" minLength={3} rows="5"
                                                maxLength={500}
                                                aria-describedby="champs description"
                                                placeholder='Description'
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                required />
                                        </div>
                                        <div className="form-group my-2">
                                            <label htmlFor="price" className='form-label'>Prix : </label>
                                            <input type="number" className='form-control' id="price" name="price" minLength={3} min={1} max={1000}
                                                maxLength={50}
                                                aria-describedby="champs price"
                                                placeholder='Prix'
                                                value={price}
                                                onChange={handlePriceChange}
                                                required />
                                        </div>
                                        <div className="form-group my-2">
                                            <label htmlFor="imageUrl" className='form-label'>Image URL : </label>
                                            <input type="text" className='form-control' id="imageUrl" name="imageUrl" minLength={3}
                                                maxLength={300}
                                                aria-describedby="champs Image"
                                                placeholder='Image'
                                                value={imageUrl}
                                                onChange={handleImageUrlChange}
                                            />
                                        </div>
                                        {Cookies.get('id') == item.userId ? (
                                            <button type="submit" className='btn btn-success mt-4'>Modifier</button>

                                        ) : (
                                            <button type="submit" className='btn btn-success mt-4 disabled' disabled>Modifier</button>

                                        )}
                                    </form>
                                </div>
                            )}
                        </>
                    )
                )}
            </>
        </div>
    );
}

