import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAZw5RV29FE2m5eQNtEnAdIEbzXympkQlY',
  authDomain: 'pokemon-api-d2eb5.firebaseapp.com',
  projectId: 'pokemon-api-d2eb5',
  storageBucket: 'pokemon-api-d2eb5.appspot.com',
  messagingSenderId: '981679596319',
  appId: '1:981679596319:web:e7c26854ded7f4925b862a'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth, firebase }
