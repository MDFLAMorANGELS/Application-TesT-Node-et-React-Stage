import React from 'react';
import moment from 'moment-timezone';

export default function Card({ item }) {
    const handleImageError = (e) => {
        e.target.src = 'https://i.pinimg.com/originals/0b/8c/08/0b8c081b7b05dcc0aad6238856ea87d2.gif';
        e.target.alt = 'Image de remplacement';
    };

    const localCreatedAt = moment(item.created_at).tz('Europe/Paris').add(2,'hours').format('YYYY-MM-DD HH:mm:ss');

    return (
        <a href='#' className="card shadow my-2">
            <img className="card-img-top" onError={handleImageError} src={item.imageUrl} alt="Photo de l objet associé" />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">{item.price} €</p>
                <p className="card-text">Créer par {item.email} <br/> le {localCreatedAt}</p>
            </div>
        </a>
    );
}
