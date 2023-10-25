const Thing = require('../models/Thing');



exports.getAllStuff = async (req, res, next) => {
    try {
        Thing.find()
            .then(things => res.status(200).json(things[0]))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Objet non Trouver' })
    }
}

exports.createThing = async (req, res, next) => {
    try {
        const userId = req.userID;
        const { title, description, imageUrl, price } = req.body;
        const thing = new Thing(title, description, imageUrl, price, userId);
        thing.save()
            .then(() => res.status(201).json({ message: 'Objet enregistrer' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Objet non enregistrer' })
    }
}

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing[0]))
        .catch(error => res.status(404).json({ error }));
}

