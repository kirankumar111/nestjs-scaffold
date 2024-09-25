import { registerAs } from '@nestjs/config';

export const FirebaseConfigName = 'firebase';

export interface FirebaseConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  databaseUrl: string;
  storageAccount: string;
}

export default registerAs(FirebaseConfigName, () => ({
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  databaseUrl: process.env.FIREBASE_DATABASE_URL || '',
  storageAccount: process.env.FIREBASE_STORAGE_BUCKET || '',
}));
