import { useState } from 'react';
import './App.scss';
import { LabeledInput } from './components/labeled-input/labeled-input';
import { RadioInput } from './components/radio-input/radio-input';

function App() {
	const [type, setType] = useState('Osoba');

	const handleRadioBtns = () => {
		if (type === 'Osoba') {
			setType('Firma');
		} else {
			setType('Osoba');
		}
		console.log('click');
	};
	console.log(type);
	return (
		<div className='container'>
			<h1>Kontrahent</h1>
			<form className='container__form'>
				<LabeledInput labelFor='first-name' name='Imię' type='text' placeholder='Imię' />

				<LabeledInput labelFor='last-name' name='Nazwisko' type='text' placeholder='Nazwisko' />

				{/* <RadioInput onClick={() => setType(true)} onBlur={() => setType(false)} /> */}

				<label className='container__form--label'>Typ:</label>
				<div className='container__radio-buttons'>
					<RadioInput label='Osoba' value='Osoba' checked={type} onChange={handleRadioBtns} />
					<RadioInput label='Firma' value='Firma' checked={type} onChange={handleRadioBtns} />
				</div>

				<LabeledInput
					labelFor='id-number'
					name='Numer identyfikacyjny'
					type='number'
					placeholder={type === 'Osoba' ? 'Pesel' : 'NIP'}
				/>

				<LabeledInput
					labelFor='image'
					name='Zdjęcie'
					type='file'
					accept='image/jpg, image/jpeg'
				/>

				<input className='container__form--submit-btn' type='submit' value='Submit!' />
			</form>
		</div>
	);
}

export default App;
