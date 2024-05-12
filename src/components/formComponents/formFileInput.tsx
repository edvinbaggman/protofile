'use client';

import { ChangeEvent, useState } from 'react';
import { useField } from 'formik';
import { allowedFileTypes } from '@/constants/fileTypes';

interface Props {
  label: string;
  name: string;
  className?: string;
  inputClassName?: string;
}

const FormFileInput = ({
  label,
  name,
  className = '',
  inputClassName = '',
}: Props) => {
  const [error, setError] = useState<string>('');
  const [field, meta, helpers] = useField({ name });
  const { setValue } = helpers;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length) {
      const file = fileList[0];
      const fileType = file.type;
      const fileSize = file.size;

      if (fileSize > 5000000) {
        setError('File to large');
      } else if (!allowedFileTypes.includes(fileType)) {
        setError('Filetype not supported');
      } else {
        setError('');
        setValue(file);
      }
    }
  };

  const errorExists = (meta.touched && meta.error) || error;

  return (
    <div className={className}>
      <label className='text-sm font-bold' htmlFor={name}>
        {label}
      </label>
      <input
        type='file'
        className={`btn rounded file:hidden block w-full text-sm text-gray-900 border-2 cursor-pointer bg-white focus:outline-none h-10 ${
          errorExists && 'border-red-500'
        } ${inputClassName}`}
        onChange={handleChange}
        accept='image/jpeg, application/pdf, application/xml'
      />
      <p className='text-sm text-gray-500'>JPG, PDF, XML (MAX. 5mb)</p>
      <p className='pl-2 text-red-500 h-6'>
        {error && error}
        {!error && meta.touched && meta.error && meta.error}
      </p>
    </div>
  );
};

export default FormFileInput;
