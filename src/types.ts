export interface IFile {
  _id: string;
  name: string;
  uploader: string;
  date: string;
  type: 'application/pdf' | 'application/xml' | 'image/jpeg';
  description: string;
}

export type SortKey = 'name' | 'description' | 'uploader' | 'date';
