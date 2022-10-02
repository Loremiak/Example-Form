import React, { ChangeEvent, useState } from 'react';
import './image-select-input.scss';

interface ImageSelectInputProps {
  name: string;
  accept: string;
}

export const ImageSelectInput = ({ name, accept }: ImageSelectInputProps) => {
  const [image, setImage] = useState<string | undefined>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );

  const imageChange = (event: ChangeEvent) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
    };
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.readAsDataURL(file);
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
