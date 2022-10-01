import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { SelectOptions } from './components/select-options/select-options';
import { validateNip, validatePesel } from './helpers/helper';

function App() {
  const [type, setType] = useState('Osoba');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');

  const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const handlePeselNip = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const newValue = event.currentTarget.value;
    if (type === 'Osoba') {
      validatePesel(newValue);
    } else {
      validateNip(newValue);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    console.log('click');
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:60001/Contractor/Save');
      const data = await response.json();
      return data;
    } catch (error) {
      setError('Nie znaleziono metody zapisu');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Kontrahent</h1>
      </header>
      <form className="container__form" method="post" onSubmit={handleSubmit}>
        <LabeledInput labelFor="first-name" name="Imię" type="text" placeholder="Imię" required />

        <LabeledInput
          labelFor="last-name"
          name="Nazwisko"
          type="text"
          placeholder="Nazwisko"
          required
        />

        <SelectOptions name="type" typeDetector="Osoba" />

        <LabeledInput
          labelFor="id-number"
          name="Numer identyfikacyjny"
          type="number"
          placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
          onChange={() => handlePeselNip}
          required
        />

        <LabeledInput
          labelFor="image"
          name="Zdjęcie"
          type="file"
          accept="image/jpg, image/jpeg"
          onChange={() => imageChange}
        />
        {selectedImage && (
          <div>
            <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
            <button onClick={removeSelectedImage}>Remove This Image</button>
          </div>
        )}

        <button className="container__form--submit-btn" type="submit">
          Wyślij
        </button>
        {error && (
          <span className="container__form--alert-message">Nie znaleziono metody zapisu</span>
        )}
      </form>
    </div>
  );
}

export default App;
