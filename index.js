
import { initializeApp } from "firebase/app";
import { getFirestore,collection,onSnapshot ,getDocs,addDoc,deleteDoc,doc,query,where,orderBy,serverTimestamp,updateDoc} from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { get } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBByt8eqVQuEKTicMV6y67tss0O8JpDZGw",
  authDomain: "learntofire-b084d.firebaseapp.com",
  projectId: "learntofire-b084d",
  storageBucket: "learntofire-b084d.appspot.com",
  messagingSenderId: "197490360104",
  appId: "1:197490360104:web:237aeac89808f7d6f79a1d"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore()
const auth=getAuth()
const colref=collection(db,"cart")
const Rquerr=query(colref,where("category","==","horror"),orderBy("createdtime"))
const documentref=doc(db,"cart","U2bNshyN5xgMH8oPLtYi");
onSnapshot(documentref,(document)=>{
console.log(document.data(),document.id)
})

getDocs(colref).then(data=>{
  let movies=[];
  data.docs.forEach(document=>{
    movies.push({...document.data(),id:document.id})
  })
  console.log(movies)
})
.catch(err=>console.log(err))

// onSnapshot(colref,(data)=>{
//   let movies=[];
//     data.docs.forEach(document=>{
//       movies.push({...document.data(),id:document.id})
//     })
//     console.log(movies)
//   })


const addform=document.querySelector('.add');
addform.addEventListener("submit",(e)=>{
  e.preventDefault()
addDoc(colref,{
name:addform.name.value,
description:addform.description.value,
category:addform.category.value,
createdtime:serverTimestamp(),

})
.then(()=>{
  addform.reset()
})
})
const delteid=document.querySelector('.delete')
delteid.addEventListener("submit",(e)=>{
   e.preventDefault()
   const documentref=doc(db,"cart",delteid.id.value);
   deleteDoc(documentref).then(()=>{
    delteid.reset()
   })
})
const update=document.querySelector('.update')
update.addEventListener("submit",(e)=>{
   e.preventDefault()
   const documentref=doc(db,"cart",update.id.value);
   updateDoc(documentref,{
    name:update.name.value,
    createdtime:serverTimestamp()
   })
   .then(()=>{
    update.reset()
   })
})

const registerationfrom=document.querySelector('.regist');
registerationfrom.addEventListener("submit",(e)=>{
  e.preventDefault()
  createUserWithEmailAndPassword(auth,registerationfrom.email.value,registerationfrom.password.value)
  .then(Credential=>{
    console.log(Credential)
  })
  .catch((err)=>console.log(err))
})
const logout=document.querySelector('.logoutform');
logout.addEventListener("click",(e)=>{
  console.log("i am working")
  e.preventDefault()
  signOut(auth)
  .then(()=>{
    console.log('sing out by user')
  })
  .catch((err)=>{
    console.log(err)
  })
})
const lgin=document.querySelector('.login');
lgin.addEventListener("submit",(e)=>{
  e.preventDefault()
  signInWithEmailAndPassword(auth,lgin.email.value,lgin.password.value)
  .then(Credential=>{
    console.log(Credential.user.email)
  })
  .catch(err=>console.log(err))
})