import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  getStorage,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBiZtLHoBJZucdDk_rW8svW5Yt8Obdxs-0',
  authDomain: 'tart-scratch-proto.firebaseapp.com',
  projectId: 'tart-scratch-proto',
  storageBucket: 'tart-scratch-proto.appspot.com',
  messagingSenderId: '949286896826',
  appId: '1:949286896826:web:50db0e5e972a719916ae83',
  measurementId: 'G-3FK1WEB7WL',
};

interface IProject {
  content: string;
  thumbnail: string;
}

// Initialize Firebase
class FBApp {
  app: FirebaseApp;
  db: Firestore;
  storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  async getProjects() {
    const q = query(
      collection(this.db, 'projects'),
      orderBy('createdAt', 'desc')
    );

    const querySnap = await getDocs(q);

    return querySnap.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  }

  async getAssets() {
    getDownloadURL(
      ref(this.storage, '0fb9be3e8397c983338cb71dc84d0b25.svg')
    ).then((url) => {
      window.fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });
    });
  }

  uploadProject(project: IProject) {
    return addDoc(collection(this.db, 'projects'), {
      content: project.content,
      thumbnail: project.thumbnail,
      createdAt: Timestamp.now(),
    });
  }
}

export const fbApp = new FBApp();
