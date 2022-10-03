import React, { useState } from 'react';
import './image-select-input.scss';

interface ImageSelectInputProps {
  name: string;
  accept: string;
  value: string | undefined;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const ImageSelectInput = ({ name, accept, onChange }: ImageSelectInputProps) => {
  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
    };
    const target = event.target.files;
    if (target) {
      const file: File = target[0];
      reader.readAsDataURL(file);
    }
    return onChange;
  };
  return (
    <>
      <label className="image-select-input__label" htmlFor={name}>
        Zdjęcie
      </label>
      <img src={image} alt="Your choose" className="image-select-input__image" />
      <input
        className="image-select-input__input"
        name={name}
        type="file"
        accept={accept}
        onChange={imageChange}
      />
    </>
  );
};
