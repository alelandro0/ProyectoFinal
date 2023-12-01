// authCtrl.js
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      if (!username) {
        return res.status(400).json({msg:'nombre obligatorio'});
      }
      console.log('Valores recibidos:');
      console.log('fullname:', fullname);
      console.log('username:', username);
      console.log('email:', email);
      console.log('password:', password);
      console.log('gender:', gender);

      const newUsername = username.toLowerCase().replace(/ /g, '');
      // Verificar si el nombre de usuario ya existe en la base de datos
      const user_name = await Users.findOne({ username: newUsername });

      if (user_name) {
        return res.status(400).json({ msg: 'Este nombre de usuario ya existe' });
      }
       console.log(user_name);
      // Verificar si el correo electrónico ya existe en la base de datos
      const existingEmail = await Users.findOne({ email: email });
      if (existingEmail) {
        return res.status(400).json({ msg: 'Este correo ya existe' });
      }
       console.log('email: ',existingEmail);
      if (password.length < 6) {
        return res.status(400).json({ msg: 'La contraseña debe tener al menos 6 caracteres' });
      }

      const passwordHash = await bcrypt.hash(password, 13);

      const newUser = new Users({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });
      
       //Inicio
      // Generar tokens de acceso y refresco
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 24 * 30 * 60 * 60 * 1000,
      });

      await newUser.save();

      res.json({
        msg: 'Registro exitoso',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
      //fin
    } catch (err) {
      res.status(500).json({ msg: err.message,err:'Error a crear el usuario' },);
   
    }
  },
  login: async (req, res) => {
    try {
        const{email,password}=req.body;
        const user= await Users.findOne({email})
        
        .populate("friends following" , "-password")

        if (!user) return res.status(400).json({msg:'Usuario no existe'})
            
        const isMatch= await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({msg:'Contraseña incorrecta'})

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });
  
        res.cookie('refreshToken', refresh_token, {
          httpOnly: true,
          path: '/api/refresh_token',
          maxAge: 24 * 30 * 60 * 60 * 1000,
        });
  
        res.json({
          msg: 'Sesion Exitosa',
          access_token,
          user: {
            ...user._doc,
            password: '',
          },
        });
    } catch(err){
        res.status(500).json({msg: err.message})
    }
  },
  logout: async (req, res) => {
    try {
        res.clearCookie('refreshToken', { path: "/api/refresh_token" });
        res.json({msg:'Cerraste Sesion'})

    } catch (err) {
        res.status(500).json({err:'Algo ocurrio mal'})
        
    }
  },
  generateAccessToken: async (req, res) => {
    try {
        const rf_token= req.cookies.refreshToken;
        console.log('token backend',rf_token);
        if(!rf_token) return res.status(400).json({msg:'iniciar sesion a hora'})

        jwt.verify(rf_token, process.env.REFRESHTOKENSECRET,async(err,result)=>{
            if(err) return res.status(400).json({msg:'iniciar sesion a hora'})
            const user = await Users.findById(result.id).select("-password")
            .populate("friends following")

            if(!user) return res.status(400).json({msg:'Usuario no existe'})
            //--->
            const access_token = createAccessToken({ id: result._id });

            res.json({
                access_token,
                user
            })
        })
    } catch (err) {
        res.status(500).json({err:'Algo ocurrio mal con generateAccessToken '})
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESHTOKENSECRET, { expiresIn: '30d' });
};

module.exports = authCtrl;
