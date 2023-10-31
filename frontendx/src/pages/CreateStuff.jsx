import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function CreateStuff() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

    function resetForm() {
        setTitle('');
        setDescription('');
        setPrice('');
        setImageUrl('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stuffData = { title, description, price, imageUrl };
        const token = Cookies.get('token');

        try {
            const stuffResponse = await fetch("http://localhost:3000/api/stuff", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify(stuffData),
            });

            if (stuffResponse.ok) {
                const Data = await stuffResponse.json();
                navigate('/')
                resetForm()
                console.log('Objet créer :', Data);
            } else {
                console.error('Échec de la création :', stuffResponse);
                setError('Échec de la création de l objet');
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
                <h2>Creer un article</h2>
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
                <button type="submit" className='btn btn-primary mt-4'>Mettre en Vente</button>
            </form>
        </div>
    )
}
