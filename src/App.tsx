import React, { ChangeEvent } from 'react';
import { FormEvent, useState } from 'react';
import './App.scss';
import { ImageSelectInput } from './components/image-select-input/image-select-input';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { SelectOptions } from './components/select-options/select-options';
import { validateNip, validatePesel } from './helpers/helper';

function App() {
  const [type, setType] = useState('Osoba');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePeselNip = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    const newValue = event.currentTarget.value;

    console.log(newValue);
    validatePesel(newValue);

    // validateNip(newValue);
  };

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:60001/Contractor/Save');
      const data = await response.json();
      return data;
    } catch (error) {
      setError('Nie znaleziono metody zapisu');
    }
    setIsLoading(false);
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
        {/* <span>Błąd w numerze identyfikacyjny</span> */}

        <ImageSelectInput accept="image/jpg, image/jpeg" name="image" />

        <button className="container__form--submit-btn" type="submit">
          {isLoading ? <div className="container__form--loader" /> : 'Wyślij'}
        </button>
        {error && (
          <span className="container__form--alert-message">Nie znaleziono metody zapisu</span>
        )}
      </form>
    </div>
  );
}

export default App;
