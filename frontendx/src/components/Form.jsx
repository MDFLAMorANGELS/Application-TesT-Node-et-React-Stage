import React from 'react';

const Form = ({ title, description, price, imageUrl, error, onTitleChange, onDescriptionChange, onPriceChange, onImageUrlChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='bg-white p-5 rounded shadow'>
      <h2>Créer un article</h2>
      {error && (
        <div className="alert alert-danger py-3" role="alert">
          {error}
        </div>
      )}
      <div className="form-group my-2">
        <label htmlFor="title" className='form-label'>Titre : </label>
        <input
          type="text"
          className='form-control'
          id="title"
          name="title"
          minLength={3}
          maxLength={50}
          aria-describedby="champs titre"
          placeholder='Titre'
          value={title}
          onChange={onTitleChange}
          required
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="description" className='form-label'>Description : </label>
        <textarea
          type="text"
          className='form-control'
          id="description"
          name="description"
          minLength={3}
          rows="5"
          maxLength={500}
          aria-describedby="champs description"
          placeholder='Description'
          value={description}
          onChange={onDescriptionChange}
          required
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="price" className='form-label'>Prix : </label>
        <input
          type="number"
          className='form-control'
          id="price"
          name="price"
          minLength={3}
          min={1}
          max={1000}
          maxLength={50}
          aria-describedby="champs price"
          placeholder='Prix'
          value={price}
          onChange={onPriceChange}
          required
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="imageUrl" className='form-label'>Image URL : </label>
        <input
          type="text"
          className='form-control'
          id="imageUrl"
          name="imageUrl"
          minLength={3}
          maxLength={300}
          aria-describedby="champs Image"
          placeholder='Image'
          value={imageUrl}
          onChange={onImageUrlChange}
        />
      </div>
      <button type="submit" className='btn btn-primary mt-4'>Mettre en Vente</button>
    </form>
  );
};

export default Form;