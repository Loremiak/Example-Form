import React, { useState } from 'react';
import './select-options.scss';

interface SelectOptionsProps {
  name: string;
  typeDetector: string;
}

export const SelectOptions = ({ name, typeDetector }: SelectOptionsProps) => {
  const [currentType, setCurrentType] = useState(typeDetector);

  const changeType = (newType: string): void => {
    setCurrentType(newType);
  };

  return (
    <>
      <label className="select-options__label" htmlFor={name}>
        Typ:
      </label>
      <select
        className="select-options__select"
        name={name}
        onChange={(event) => changeType(event.target.value)}
        value={currentType}>
        <option value="osoba">Osoba</option>
        <option value="firma">Firma</option>
      </select>
    </>
  );
};
