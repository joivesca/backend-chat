const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password }  = req.body;

    try {

        const exists = await User.findOne({ email: email });

        if(exists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();

        user.password=bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT( user.id );
        
        res.json({
            ok:true,
            user,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Communicate with admin'
        });
    }
}


const login = async (req, res = response) => {

    const { email, password }  = req.body;
     console.log(password);
    try {
       

        const user = await  User.findOne({email});

        console.log(user);
        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password invalid'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            ok:true,
            user,
            token
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Communicate with admin'
        });
    }
}

const renewToken = async (req, res = response) => {
    
    const  uid  = req.uid;
    console.log(uid);
    
    try {
       
        const token = await generateJWT(uid);

        const user = await User.findById(uid);

        res.json({
            ok:true,
            user,
            token
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Communicate with admin'
        });
    }
}

module.exports = { createUser, login, renewToken };