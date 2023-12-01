import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/login.css';
import { useDispatch } from 'react-redux';
import { login } from "../redux/actions/authAction";

const Login = () => {
  const initialState = {email:'',password:''}
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  const {email, password}= userData;
 

  const handleChange= (e) =>{
    const{name, value}= e.target
    setUserData({...userData, [name]:value})
  }
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(userData));
  }
{console.log(handleSubmit)}
  return (
    <div className="login">
      <h1 className="login-header">Login</h1>
      <div className="login-data">
        <form className="form" onSubmit={handleSubmit}>

          <label >Email</label>
          <input
            type="email"
            placeholder="Escribe tu correo electrónico"
            name="email"
            value={email}
            onChange={handleChange}
            id="email"
          />

          <label>Password</label>
          <input
            type={showpass ? "text" : "password"}
            placeholder="Escribe tu contraseña"
            name="password"
            value={password}
            onChange={handleChange}
            id="password" 
          />
          <small onClick={() => setShowpass(!showpass)}>
            {showpass ? "Ocultar" : "Ver"}
          </small>

          <button type="submit">Login</button>
          <small className="register-email">
            ¿Aún no tienes cuenta? <Link to="/register">Entra Aquí</Link>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
