import React, { FormEvent } from 'react';
import './labeled-input.scss';

interface LabeledInputProps {
  labelFor: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({
  labelFor,
  name,
  placeholder,
  type,
  onChange,
  value,
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
        value={value}
        required={required}
      />
    </>
  );
};
