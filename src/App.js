import { useState } from 'react';
import './App.css';
import Data from './Data';
import { auth, provider } from './Firebase';
import Header from './Header';
import Sidebar from './Sidebar';

function App() {
  const [user,setUser ] = useState(null);

  const signin = () => {
    auth.signInWithPopup(provider).then(({user}) => {
      setUser(user)
    }).catch(error=>{
      alert(error.message)
    })
  }
  
  return (
    <>
    {user ? (
      <>
    <Header photoURL={user.photoURL}/>
    <div className="App">
      <Sidebar/>
      <Data/>
    </div>
    </>
  ):(
    <div className='loginwrap'>
      <img src="https://w7.pngwing.com/pngs/176/849/png-transparent-google-logo-drive-new-google-new-logos-icon-thumbnail.png"/>
      <button onClick={signin}>Login to google drive clone</button>
    </div>
  )
    }
    </>
  )
}

export default App;
