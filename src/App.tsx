import { useState } from 'react';
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
	console.log(type);

	// const validatePesel = pesel => {
	// 	let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
	// 	let sum = 0;
	// 	let controlNumber = parseInt(pesel.substring(10, 11));

	// 	for (let i = 0; i < weight.length; i++) {
	// 		sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
	// 	}
	// 	sum = sum % 10;
	// 	return (10 - sum) % 10 === controlNumber;
	// };

	// const validateNip = nip => {
	// 	if (typeof nip !== 'string') return false;

	// 	nip = nip.replace(/[\\-]/gi, '');

	// 	let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
	// 	let sum = 0;
	// 	let controlNumber = parseInt(nip.substring(9, 10));
	// 	let weightCount = weight.length;
	// 	for (let i = 0; i < weightCount; i++) {
	// 		sum += parseInt(nip.substr(i, 1)) * weight[i];
	// 	}

	// 	return sum % 11 === controlNumber;
	// };

	return (
		<div className='container'>
			<h1>Kontrahent</h1>
			<form className='container__form'>
				<LabeledInput labelFor='first-name' name='Imię' type='text' placeholder='Imię' />

				<LabeledInput labelFor='last-name' name='Nazwisko' type='text' placeholder='Nazwisko' />

				<SelectOptions onChange={handleSelectOptions} />

				<LabeledInput
					labelFor='id-number'
					name='Numer identyfikacyjny'
					type='number'
					placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
				/>

				<LabeledInput labelFor='image' name='Zdjęcie' type='file' accept='image/jpg, image/jpeg' />

				<input className='container__form--submit-btn' type='button' value='Submit!' />
			</form>
		</div>
	);
}

export default App;
