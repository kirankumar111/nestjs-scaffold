import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirestoreService } from './firestore.service';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from 'src/configs/firebase.config';

@Module({
    imports: [
        ConfigModule.forFeature(firebaseConfig),
    ],
  providers: [FirebaseService, FirestoreService],
  exports: [FirebaseService, FirestoreService],
})
export class FirebaseModule {}