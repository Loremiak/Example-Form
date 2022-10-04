import React from 'react';
import { useState } from 'react';
import './App.scss';
import { ImageSelectInput } from './components/image-select-input/image-select-input';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { SelectOptions } from './components/select-options/select-options';
import { validatePolish } from 'validate-polish';

function App() {
  const [type, setType] = useState('Osoba');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidIdNumber, setIsValidIdNumber] = useState(true);
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    type: 'Osoba',
    idNumber: '',
    image: ''
  });
  const [error, setError] = useState('');

  const handleValidation = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (type === 'Osoba') {
      const validatedPesel = validatePolish.pesel(newValue);
      setIsValidIdNumber(validatedPesel);
      handleInputChange(event);
    }
    if (type === 'Firma') {
      const validatedNip = validatePolish.nip(newValue);
      setIsValidIdNumber(validatedNip);
      handleInputChange(event);
    }
    if (!newValue) {
      setIsValidIdNumber(true);
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:60001/Contractor/Save', {
        method: 'POST',
        body: JSON.stringify({
          name: values.name,
          lastName: values.lastName,
          type: type,
          idNumber: values.idNumber,
          image: values.image
        })
      });
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
        <LabeledInput
          labelFor="name"
          name="Imię"
          type="text"
          placeholder="Imię"
          value={values.name}
          onChange={handleInputChange}
          required
        />

        <LabeledInput
          labelFor="lastName"
          name="Nazwisko"
          type="text"
          placeholder="Nazwisko"
          value={values.lastName}
          onChange={handleInputChange}
          required
        />

        <SelectOptions name="type" setType={setType} />

        <LabeledInput
          labelFor="idNumber"
          name={`Numer identyfikacyjny ${type === 'Osoba' ? 'Pesel' : 'NIP'}`}
          type="number"
          placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
          onChange={(event) => handleValidation(event)}
          required
        />
        {!isValidIdNumber && (
          <span className="container__form--id-error">Błąd w numerze identyfikacyjnym</span>
        )}

        <ImageSelectInput
          accept="image/jpg, image/jpeg"
          name="Zdjęcie"
          value={values.image}
          onChange={handleInputChange}
        />

        {isValidIdNumber ? (
          <button className="container__form--submit-btn" type="submit">
            {isLoading ? <div className="container__form--loader" /> : 'Wyślij'}
          </button>
        ) : (
          <button className="container__form--submit-btn" disabled>
            Wyślij
          </button>
        )}

        {error && (
          <span className="container__form--submit-error">
            Nie znaleziono metody zapisu
            <span className="container__form--submit-error--abort" onClick={() => setError('')}>
              X
            </span>
          </span>
        )}
      </form>
    </div>
  );
}

export default App;
