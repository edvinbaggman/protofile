'use client';

import { IFile, SortKey } from '@/types';
import Image from 'next/image';
import xml from '../../public/xml.png';
import jpg from '../../public/jpg.png';
import pdf from '../../public/pdf.png';
import DeleteFileButton from './deleteFileButton';
import { useState } from 'react';
import mimeTypes from 'mime-types';

interface Props {
  files: IFile[];
}

const fileTypeToImg = {
  'application/pdf': pdf,
  'application/xml': xml,
  'image/jpeg': jpg,
};

const FileTable = ({ files }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>(
    'descending'
  );

  const sortedFiles = files.sort((a, b) => {
    let val;
    if (sortKey === 'date')
      val = new Date(b.date).getTime() - new Date(a.date).getTime();
    else val = a[sortKey].localeCompare(b[sortKey]);
    return sortOrder === 'descending' ? val : -val;
  });

  const filesPerPage = 5;
  const numberOfPages = Math.floor((files.length - 1) / filesPerPage) + 1;
  const filesToShow = sortedFiles.slice(
    page * filesPerPage,
    (page + 1) * filesPerPage
  );

  const changeSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortOrder === 'ascending') setSortOrder('descending');
      else setSortOrder('ascending');
    } else {
      setSortKey(key);
      setSortOrder('descending');
    }
  };

  const SortArrow = (key: string) => {
    if (sortKey === key)
      return <span>{sortOrder === 'descending' ? '\u25BC' : '\u25B2'}</span>;
  };

  return (
    <div className='flex flex-col shadow rounded w-full max-w-fit overflow-scroll break-words'>
      <div className='flex flex-row w-fit bg-gray-50 font-semibold uppercase'>
        <div className='flex-none w-16'></div>
        <div
          className='flex-none w-48 p-2 cursor-pointer'
          onClick={() => changeSort('name')}
        >
          Filename {SortArrow('name')}
        </div>
        <div
          className='flex-none w-48 p-2 cursor-pointer'
          onClick={() => changeSort('description')}
        >
          Description {SortArrow('description')}
        </div>
        <div
          className='flex-none w-48 p-2 cursor-pointer'
          onClick={() => changeSort('uploader')}
        >
          Uploaded by {SortArrow('uploader')}
        </div>
        <div
          className='flex-none w-28 p-2 cursor-pointer'
          onClick={() => changeSort('date')}
        >
          Date {SortArrow('date')}
        </div>
        <div className='flex-none w-28 p-2'></div>
      </div>
      <div className='w-fit'>
        {filesToShow.map((file) => {
          const date = new Date(file.date);
          return (
            <div
              key={file._id}
              className='flex flex-row items-center odd:bg-white even:bg-gray-50'
            >
              <div className='flex-none w-16 p-4'>
                <Image src={fileTypeToImg[file.type]} alt={file.type} />
              </div>
              <div className='flex-none w-48 p-2'>
                <a
                  className='font-bold hover:underline'
                  href={`https://${
                    process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
                  }.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${
                    file._id
                  }.${mimeTypes.extension(file.type)}`}
                >
                  {file.name}
                </a>
              </div>
              <div className='flex-none w-48 p-2'>{file.description}</div>
              <div className='flex-none w-48 p-2'>{file.uploader}</div>
              <div className='flex-none w-28 p-2'>{`${date.getFullYear()}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${date
                .getDate()
                .toString()
                .padStart(2, '0')}`}</div>
              <div className='flex-none w-28 p-2'>
                <DeleteFileButton id={file._id} type={file.type} />
              </div>
            </div>
          );
        })}
        <div className='flex flex-row odd:bg-white even:bg-gray-50 p-2 gap-1'>
          <div>Page:</div>
          {Array.from({ length: numberOfPages }).map((_, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer ${index == page ? '' : 'underline'}`}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FileTable;
