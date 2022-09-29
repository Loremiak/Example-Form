import { FormEvent, useState } from 'react';
import './App.scss';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { SelectOptions } from './components/select-options/select-options';

function App() {
	const [type, setType] = useState('Osoba');

	const handleSelectOptions = () => {
		if (type === 'Osoba') {
			setType('Firma');
		} else {
			setType('Osoba');
		}
	};

	const validatePesel = pesel => {
		let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
		let sum = 0;
		let controlNumber = parseInt(pesel.substring(10, 11));

		for (let i = 0; i < weight.length; i++) {
			sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
		}
		sum = sum % 10;
		return (10 - sum) % 10 === controlNumber;
	};

	const validateNip = nip => {
		// if (typeof nip !== 'string') return false;

		// nip = nip.replace(/[\\-]/gi, '');

		let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
		let sum = 0;
		let controlNumber = parseInt(nip.substring(9, 10));
		let weightCount = weight.length;
		for (let i = 0; i < weightCount; i++) {
			sum += parseInt(nip.substr(i, 1)) * weight[i];
		}

		return sum % 11 === controlNumber;
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
			throw new Error('Nie znaleziono metody zapisu');
		}
	};

	return (
		<div className='container'>
			<h1>Kontrahent</h1>
			<form className='container__form' method='post' onSubmit={handleSubmit}>
				<LabeledInput labelFor='first-name' name='Imię' type='text' placeholder='Imię' required />

				<LabeledInput labelFor='last-name' name='Nazwisko' type='text' placeholder='Nazwisko' required />

				<SelectOptions onChange={handleSelectOptions} />

				<LabeledInput
					labelFor='id-number'
					name='Numer identyfikacyjny'
					type='number'
					placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
					onChange={() => handlePeselNip}
					required
				/>

				<LabeledInput labelFor='image' name='Zdjęcie' type='file' accept='image/jpg, image/jpeg' />

				<input className='container__form--submit-btn' type='button' value='Wyślij' />
			</form>
		</div>
	);
}

export default App;
