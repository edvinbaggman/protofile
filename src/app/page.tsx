import FileTable from '@/components/fileTable';
import { getAllFiles } from '@/server/fileService';
import Link from 'next/link';

export default async function Home() {
  const files = await getAllFiles();

  return (
    <>
      <FileTable files={files} />
      <div className='mt-4'>
        <Link className='btn' href={'/upload'}>
          Upload file
        </Link>
      </div>
    </>
  );
}
