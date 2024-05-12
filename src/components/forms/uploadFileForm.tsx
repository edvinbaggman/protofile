'use client';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormInput from '../formComponents/formInput';
import { uploadFile } from '@/server/fileService';
import FormFileInput from '../formComponents/formFileInput';
import { useRouter } from 'next/navigation';

interface formValues {
  name: string;
  uploader: string;
  description: string;
  file: File | string;
}

const UploadFileForm = () => {
  const router = useRouter();
  const initialValues = {
    name: '',
    uploader: '',
    description: '',
    file: '',
  };

  const errorString = 'Field is required';

  const validationSchema = Yup.object({
    name: Yup.string().required(errorString),
    uploader: Yup.string().required(errorString),
    description: Yup.string().required(errorString),
    file: Yup.mixed().required(errorString),
  });

  async function onSubmit(values: formValues) {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('name', values.name);
    formData.append('uploader', values.uploader);
    formData.append('description', values.description);
    await uploadFile(formData);
    router.push('/');
  }

  return (
    <div className='w-full flex justify-center'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='w-full max-w-96'>
            <div className='flex flex-col'>
              <FormInput label='Name' name='name' type='text' />
              <FormInput label='Uploader' name='uploader' type='text' />
              <FormInput label='Description' name='description' type='text' />
              <FormFileInput label='File' name='file' />
            </div>
            <div className='flex justify-center gap-4'>
              <button disabled={isSubmitting} type='submit' className='btn'>
                {isSubmitting ? 'Loading...' : 'Upload File'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadFileForm;
