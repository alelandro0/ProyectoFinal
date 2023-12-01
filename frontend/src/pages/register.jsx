import {useState} from "react"
import { Link } from "react-router-dom";
import '../styles/register.css'
const Register = () => {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [fullname, setfullname]=useState('');
  const [username, setusername]=useState('')
  const [confirmPassword, setconfirmPassword]=useState('')
  const [showpass, setShowpass]=useState(false);
  const [gender, setGender]=useState('other');

  return (
    <div>
       <h1 className="login-header">Registro</h1>
       <div className="register-data">
        <form action="" className="form2">
          <div className="hijo">
         <div className="section1">

        <label htmlFor="">Nombres</label>
        <input type="text"
         value={fullname}
         onChange={(e)=>setfullname(e.target.value)}
         placeholder="Nombre Completo"></input>

        <label htmlFor="">Nombre de Usuario</label>
        <input type="text"
         value={username}
         onChange={(e)=>setusername(e.target.value)}
         placeholder="Nombre de Usuario"></input>
 
        <label htmlFor="">Email</label>
        <input type="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder="Correo Electronico"></input>
     </div>
      <div className="section2">

        <label htmlFor="">Password</label>
        <input  type={showpass ? "type" : "password"}
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         placeholder="Password"></input>

         <label htmlFor="">Confirmar Password</label>
        <input  type={showpass ? "type" : "password"}
         value={confirmPassword}
         onChange={(e)=>setconfirmPassword(e.target.value)}
         placeholder="Confirmar Password"></input>

        <p className="texto"  onClick={()=>setShowpass(!showpass)}>{showpass ? "Ocultar" : "Ver"}</p>
         
         <label className="info" htmlFor="">Sexo</label>
         <select className="valu" 
         name="" id="" 
         value={gender} 
         onChange={(e)=>setGender(e.target.value)}>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
        </select>

         </div>
         </div>
         <br />
         <br />
         <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <button className="boton" type="submit">Register</button>
        <br />
        <small className="register-email">¿Ya tienes una cuenta? <Link to="/login">Entre Aqui</Link></small>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Register
