import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfig, FirebaseConfigName } from 'src/configs/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: admin.app.App;

  constructor(private configService: ConfigService) {
    
  }

  onModuleInit() {
    this.initializeFirebaseApp();
  }

  private initializeFirebaseApp() {
    const firebaseConfig =
      this.configService.getOrThrow<FirebaseConfig>(FirebaseConfigName);
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseConfig.projectId,
          privateKey: firebaseConfig.privateKey,
          clientEmail: firebaseConfig.clientEmail,
        }),
        databaseURL: firebaseConfig.databaseUrl,
        storageBucket: firebaseConfig.storageAccount,
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  getFirestore() {
    return this.firebaseApp.firestore();
  }
}