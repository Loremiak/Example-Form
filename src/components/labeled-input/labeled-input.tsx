import './labeled-input.scss';

interface LabeledInputProps {
	labelFor: string;
	name: string;
	type: string;
	placeholder?: string;
	accept?: string;
}

export const LabeledInput = ({ labelFor, name, placeholder, type }: LabeledInputProps) => {
	return (
		<>
			<label className='label__label' htmlFor={labelFor}>
				{name}
			</label>
			<input className='label__input' type={type} placeholder={placeholder} name={labelFor} />
		</>
	);
};
