import React from 'react';
import './labeled-input.scss';

interface LabeledInputProps {
  labelFor: string;
  name: string;
  type: string;
  placeholder?: string;
  accept?: string;
  required?: boolean;
  onChange?: () => void;
}

export const LabeledInput = ({
  labelFor,
  name,
  placeholder,
  accept,
  type,
  onChange,
  required
}: LabeledInputProps) => {
  return (
    <>
      <label className="label__label" htmlFor={labelFor}>
        {name}
      </label>
      <input
        className="label__input"
        type={type}
        placeholder={placeholder}
        name={labelFor}
        onChange={onChange}
        required={required}
        accept={accept}
      />
    </>
  );
};
