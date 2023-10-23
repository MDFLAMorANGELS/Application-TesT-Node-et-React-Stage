const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup =  (req, res , next) => {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User (
                req.body.email,
                hash
            );
            user.save()
            .then(() => {
                return res.status(201).json({message: 'User created '})
                ;})
        })
};

exports.login = (req, res, next) => {
    User.findByEmail(req.body.email)
        .then(([rows, fields]) => {
            const user = rows[0];
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userID: user.id, // Assurez-vous que la colonne ID correspond à votre structure de base de données
                        token: jwt.sign(
                            { userID: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getUserInfo = async (req, res, next) => {
    try {
        let  info = await User.findById( req.userID );
        res.status(200).json({user : info});
    } catch (error) {
        console.log(error);
        next(error);
        
    }
}