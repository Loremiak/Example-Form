// import './radio-input.scss';

interface RadioInputProps {
	label: string;
	value: string;
	checked: string;
	onChange: () => void;
}

export const RadioInput = ({ label, value, checked, onChange }: RadioInputProps) => {
	return (
		<>
			<label>
				<input type='radio' checked={checked === value} onChange={onChange} />
				<span>{label}</span>
			</label>
		</>
	);
};
