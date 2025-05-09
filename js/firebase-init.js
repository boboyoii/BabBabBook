import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js';

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
