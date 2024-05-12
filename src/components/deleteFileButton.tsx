'use client';

import { deleteFile } from '@/server/fileService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: string;
  type: string;
}

const DeleteFileButton = ({ id, type }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    setLoading(true);
    await deleteFile(id, type);
    router.refresh();
  }

  return (
    <button
      className='btn w-full bg-red-100 hover:bg-red-200'
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? '...' : 'Delete'}
    </button>
  );
};

export default DeleteFileButton;
