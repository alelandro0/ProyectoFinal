
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Post from './pages/post'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert'
import { useSelector,useDispatch } from 'react-redux';
import Home from './pages/Home'
import { useEffect } from 'react'
import {refreshToken} from './redux/actions/authAction'



function App() {
  const {auth}= useSelector(state => state);
  const dispatch= useDispatch();
 
  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])
console.log('el valor de auth.token es ',auth.token);

  return (
    <>
      <div className='App'>
        <Router>
          <Alert/>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/' element={!auth.token? < Login /> : <Home />}/>  
            <Route path='/login' element={<Login />} />
            <Route path='/post/:id' element={ <Post /> } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App;
