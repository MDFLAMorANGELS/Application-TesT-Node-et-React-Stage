const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User (
                req.body.email,
                hash
            );
            user.save()
            .then(() => res.status(201).json({message: 'User created '}))
            .catch(() => res.status(402).json({message:"nullllllll"}) )
        })
    } catch (error) {
        console.log(error);
        return res.status(402).json({message: 'User not created '})
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [rows,] = await User.findByEmail(email);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        res.status(200).json({
            email: user.email,
            userID: user.id,
            token: jwt.sign(
                { userID: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        return res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};