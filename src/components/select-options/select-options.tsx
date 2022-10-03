import React from 'react';
import './select-options.scss';

interface SelectOptionsProps {
  name: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectOptions = ({ name, setType }: SelectOptionsProps) => {
  return (
    <>
      <label className="select-options__label" htmlFor={name}>
        Typ:
      </label>
      <select
        className="select-options__select"
        name={name}
        onChange={(event) => setType(event.target.value)}>
        <option value="Osoba">Osoba</option>
        <option value="Firma">Firma</option>
      </select>
    </>
  );
};
