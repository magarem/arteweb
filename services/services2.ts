import {db} from "../firebase2";
import { getFirestore,getDoc, deleteDoc, where, collection, getDocs, updateDoc, addDoc, doc, query, orderBy, onSnapshot} from 'firebase/firestore'
// const db = firebase.collection("/cards");
// import {db} from './firebase'
class CardDataService {
  getAll() {
    return db;
  }

  async readById (user, id){


    const docRef = doc(db, user, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  }
  
  async read (user){

    const citiesCol = query(collection(db, user), orderBy('order'))
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => {
        return {id:doc.id, ...doc.data()}
    });
    console.log(cityList);
    
    return cityList;
  }

  async create (user, data) {
    try {
        await addDoc(collection(db, user), data)
        onClose()
      } catch (err) {
        console.log(err)
      }
  }

  async update (user, id, data) {
    console.log(user, id, data)
    const docRef = doc(db, user, id);
    await updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
    })
    .catch(error => {
        console.log(error);
    })
    return "ok"
  }

  async delete (user, id) {
     await deleteDoc(doc(db, user, id));
  }
}

export default new CardDataService();