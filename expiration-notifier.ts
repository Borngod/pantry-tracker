import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const expirationNotifier = functions.pubsub.schedule('0 0 * * *').onRun(async () => {
  const db = admin.firestore();
  const pantryCollectionRef = db.collection('pantry');
  const expiringItems = await pantryCollectionRef.where('expirationDate', '<=', admin.firestore.Timestamp.fromDate(new Date(Date.now() + 86400000))).get();
  expiringItems.docs.forEach((doc) => {
    const item = doc.data() as { name: string; expirationDate: Date };
    // Send notification to user
    console.log(`Notifying user about expiring item: ${item.name}`);
  });
  return null;
});
