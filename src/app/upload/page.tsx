import UploadFileForm from '@/components/forms/uploadFileForm';
import Link from 'next/link';

export default async function Upload() {
  return (
    <div>
      <div className='align-start mb-10'>
        <Link className='btn' href={'/'}>
          Go back
        </Link>
      </div>

      <UploadFileForm />
    </div>
  );
}
