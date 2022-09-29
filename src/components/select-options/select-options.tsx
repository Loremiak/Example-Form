import './select-options.scss';

interface SelectOptionsProps {
	onChange?: () => void;
}

export const SelectOptions = ({ onChange }: SelectOptionsProps) => {
	return (
		<>
			<label className='select-options__label' htmlFor='type'>
				Typ:
			</label>
			<select className='select-options__select' name='type' onChange={onChange}>
				<option value='osoba'>Osoba</option>
				<option value='firma'>Firma</option>
			</select>
		</>
	);
};
