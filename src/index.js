import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection, 
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDYPOeRHWGvv7jnrzO6Z9lJ4uXpXL4SGs8",
    authDomain: "oya-db.firebaseapp.com",
    projectId: "oya-db",
    storageBucket: "oya-db.appspot.com",
    messagingSenderId: "24221172123",
    appId: "1:24221172123:web:d6dd0b5bda9b3482e2e13e"
  };
// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'recepes')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let recepes = [];
        snapshot.docs.forEach((doc)=>{
            recepes.push({ ...doc.data(), id: doc.id })
        })
        console.log(recepes);
    })
    .catch(err => {
        console.log(err);
    })

// adding recepes
const addRecepeForm = document.querySelector('.add');
addRecepeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        name: addRecepeForm.name.value,
        author: addRecepeForm.author.value,
        duration: addRecepeForm.duration.value,
        img: img
    })
    .then(() => {
        addRecepeForm.reset()
    })

})
// deleting recepes
const deleteRecepeForm = document.querySelector('.delete');
deleteRecepeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'recepes', deleteRecepeForm.id.value)

    deleteDoc(docRef)
    .then(() => {
        deleteRecepeForm.reset()
    })

})
