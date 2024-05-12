# Protofile

Programming task Prototyp

## Description

A small file archive

Built with:

- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) React framework for full-stack web applications
- [Tailwind](https://tailwindcss.com/) CSS framework
- [Formik](https://formik.org/) Form library for React
- [Yup](https://github.com/jquense/yup) Object schema validation
- [MongoDB](https://www.mongodb.com/) Document-oriented database
- [Amazon S3](https://aws.amazon.com/s3/) Cloud object storage

## Getting Started

Clone project and install dependencies:

```bash
git clone https://github.com/edvinbaggman/protofile.git
cd protofile
npm install
```

IMPORTANT: create file (.env.local) in root with the following keys:

- MONGODB_URI
- MONGODB_DB_NAME
- NEXT_PUBLIC_AWS_BUCKET_NAME
- NEXT_PUBLIC_AWS_REGION
- AWS_ACCESS_ID
- AWS_SECRET_ID

Run the development server:

```bash
npm run dev
```

Or, improve local development performance using Turbopack:

```bash
npm run turbo
```

Or, build the application and start the Node.js server:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000)
