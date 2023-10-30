import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Form from '../components/Form';

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
            <Form
                title={title}
                description={description}
                price={price}
                imageUrl={imageUrl}
                error={error}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onPriceChange={handlePriceChange}
                onImageUrlChange={handleImageUrlChange}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
