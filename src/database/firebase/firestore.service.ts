import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirestoreService {
  constructor(private firebaseService: FirebaseService) {}

  async getDocument(collection: string, documentId: string): Promise<any> {
    const firestore = this.firebaseService.getFirestore();
    const docRef = firestore.collection(collection).doc(documentId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    return doc.data();
  }

  async getCollection(collection: string) {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore.collection(collection).get();
    return snapshot.docs;
  }

  async queryCollection(
    collection: string,
    field: string,
    operator: FirebaseFirestore.WhereFilterOp,
    value: any,
  ): Promise<any> {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore
      .collection(collection)
      .where(field, operator, value)
      .get();
    return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
  }

  async addDocument(collection: string, data: any): Promise<string> {
    const firestore = this.firebaseService.getFirestore();
    const docRef = await firestore.collection(collection).add(data);
    return docRef.id;
  }

  async updateDocument(
    collection: string,
    documentId: string,
    data: any,
  ): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    await firestore.collection(collection).doc(documentId).update(data);
  }

  async deleteDocument(collection: string, documentId: string): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    await firestore.collection(collection).doc(documentId).delete();
  }
}