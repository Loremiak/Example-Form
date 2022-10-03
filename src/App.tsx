import React from 'react';
import { FormEvent, useState } from 'react';
import './App.scss';
import { ImageSelectInput } from './components/image-select-input/image-select-input';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { SelectOptions } from './components/select-options/select-options';
import { validatePolish } from 'validate-polish';

interface InputValueProps {
  firstName: string;
  lastName: string;
  type: string;
  idNumber: number;
  image?: string;
}

function App() {
  const [type, setType] = useState('Osoba');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidIdNumber, setIsValidIdNumber] = useState(true);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState<InputValueProps>({
    firstName: '',
    lastName: '',
    type: '',
    idNumber: 0,
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  });

  const handleValidation = (event: FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (type === 'Osoba') {
      const validatedPesel = validatePolish.pesel(newValue);
      setIsValidIdNumber(validatedPesel);
    }
    if (type === 'Firma') {
      const validatedNip = validatePolish.nip(newValue);
      setIsValidIdNumber(validatedNip);
    }
    if (!newValue) {
      setIsValidIdNumber(true);
    }
  };

  const handleChange = (event) => {
    setInputValue((prevState) => ({
      ...prevState,
      [event.currentTarget.name]: event.currentTarget.value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:60001/Contractor/Save', {
        method: 'POST',
        body: ''
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
          labelFor="first-name"
          name="Imię"
          type="text"
          placeholder="Imię"
          onChange={handleChange}
          value={inputValue.firstName}
          required
        />

        <LabeledInput
          labelFor="last-name"
          name="Nazwisko"
          type="text"
          placeholder="Nazwisko"
          value={inputValue.lastName}
          onChange={handleChange}
          required
        />

        <SelectOptions name="type" setType={setType} />

        <LabeledInput
          labelFor="id-number"
          name={`Numer identyfikacyjny ${type === 'Osoba' ? 'Pesel' : 'NIP'}`}
          type="number"
          placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
          onChange={(event) => handleValidation(event)}
          value={inputValue.type}
          // onChange={handleChange}
          required
        />
        {!isValidIdNumber && (
          <span className="container__form--number-error">Błąd w numerze identyfikacyjnym</span>
        )}

        <ImageSelectInput
          accept="image/jpg, image/jpeg"
          name="image"
          value={inputValue.image}
          // onChange={handleChange}
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
          <span className="container__form--alert-message">
            Nie znaleziono metody zapisu
            <span className="container__form--alert-message--abort" onClick={() => setError('')}>
              X
            </span>
          </span>
        )}
      </form>
    </div>
  );
}

export default App;
