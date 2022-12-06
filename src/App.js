import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import { db } from './firebaseConnection'
import { useState } from 'react'
import './App.css'

function App() {
  const[titulo, setTitulo] = useState('');
  const[autor, setAutor] = useState('');
  const[posts, setPosts] = useState([]);
  

  async function handleAdd(){

    // await setDoc(doc(db, "posts", "145678"), {    
    // titulo: titulo,
    // autor: autor,
    // })
    // .then(() => {
    //   console.log('Dados registrados no banco!')
    // }).catch((error) => {
    //   console.log('GEROU ERRO' + error)
    // })

    //Adicionar Post
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    }).then(() => {
      console.log('Cadastrado com sucesso')
      setAutor('')
      setTitulo('')
    }).catch((error) => {
      console.log('ERRO' + error)
    })
  } 

  //Buscar Posts
  async function buscarPosts(){
    
  //Buscar Post
  //   // const postRef = doc(db, "posts", "12345")
  //   // await getDoc(postRef)
  //   // .then((snapshot) => {
  //   //   setAutor(snapshot.data().autor)
  //   //   setTitulo(snapshot.data().titulo)
  //   // }).catch((error) => {
  //   //   console.log('ERRO' + error)
  //   // })
  // }

    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista)

    })
    .catch((error) => {
      console.log("Erro ao buscar")
    })
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      <div className='container'>
        <label>Título:</label>
        <textarea 
          type='text'  
          placeholder='Digite um título'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <textarea 
          type='text' 
          placeholder='Digite o nome do autor'
          value={autor}
          onChange={ (e) => setAutor(e.target.value)}

        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPosts}>Buscar Posts</button>

        <ul>
          {posts.map( (post) => {
            return(
              <li key={post.id}>
                <span>Título: {post.titulo} </span> <br/>
                <span>Autor: {post.autor} </span> <br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App; 
