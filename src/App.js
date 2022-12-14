import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore'
import { db, auth } from './firebaseConnection'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react'
import './App.css'

function App() {
  const[titulo, setTitulo] = useState('');
  const[autor, setAutor] = useState('');
  const[idPost, setIdPost] = useState('');

  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({})

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

  async function editarPost(){
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("Post atualizado")
      setIdPost("")
      setAutor("")
      setTitulo("")
    })
    .catch((error) => {
      console.log("Erro ao atualizar o Post")
    })
  }

  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() => {
      alert('Post deletado com sucesso!')
    })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("Cadastrado com sucesso")
      console.log(value);
      setEmail("")
      setSenha("")
    }).catch((error) => {
      
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca.")
      }else if(error.code === 'auth/email-already-in-use'){
        alert("Email j?? existe!")
      }
    })
  }

  async function logarUsuario(){
    alert("Teste")
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("Usu??rio logado com sucesso")
      console.log(value.user);

      setUserDetail({
        uid: value.user.email,
      })
      setUser(true);

      setEmail('')
      setSenha('')
    }).catch(() => {
      console.log("Erro ao fazer o Login")
    })
  }

  return (
    <div>
      <h1>ReactJS + Firebase</h1>

      { user && (
        <div>
          <strong>Seja bem-vindo(a) (Voc?? est?? logado!)</strong> <br/>
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span>
        </div>
      )}

      <div className='container'>
        <h2>Usuarios</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite um email'
        /><br/>

      <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Digite uma senha'
        /><br/>
      </div>

      <button onClick={novoUsuario}>Cadastrar</button>
      <button onClick={logarUsuario}>Fazer Login</button>

      <br/><br/>
      <hr/>

      <div className='container'>
        <h2>Posts</h2>
        <label>Id do Post:</label>
        <input 
          placeholder='Digite o ID do Post'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        /><br/>

        <label>T??tulo:</label>
        <textarea 
          type='text'  
          placeholder='Digite um t??tulo'
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
        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map( (post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong><br/>
                <span>T??tulo: {post.titulo} </span> <br/>
                <span>Autor: {post.autor} </span> <br/>
                <button onClick={ () => excluirPost(post.id)}>Excluir</button> <br/> <br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App; 
