import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("email existe")
      return res.status(400).json(['Ya existe un usuario con el mismo correo electrónico'] );
    }

    const existingUsername = await User.findOne({username});
    if (existingUsername) { 
        console.log('Username existe')
        return res.status(400).json(['Ya existe un usuario con el mismo nombre de usuario'] );
    }                  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    const accessToken = jwt.sign({ userId: newUser._id }, TOKEN_SECRET);
    res.cookie("token", accessToken);
    res.status(200).json({
      id: newUser._id,
      email: newUser.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(['Ha ocurrido un error al registrar el usuario']);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("entro a login")
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json(['Username Invalido']);
  }
                                                  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(['Password inválido']);
    }

    const accessToken = jwt.sign({ userId: user._id }, TOKEN_SECRET);
    
    res.cookie("token", accessToken);
 
    res.status(200).json({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json( ['Ha ocurrido un error al iniciar sesión']);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send("error del token");

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json(["Token No valido"]);

    const userFound = await User.findById(user.userId);
    if (!userFound) return res.status(401).json(["Usuario no autorizado"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

