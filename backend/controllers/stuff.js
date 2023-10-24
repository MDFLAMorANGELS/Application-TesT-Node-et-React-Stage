const Thing = require('../models/Thing');



exports.getAllStuff = (req, res, next) => {
    Thing.find()
        .then(things => {
            console.log(things); // Afficher les objets things dans la console
            res.status(200).json(things[0]);
        })
        .catch(error => res.status(400).json({ error }));
}

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const { title, description, imageUrl, price } = req.body;
    const thing = new Thing(title, description, imageUrl, price);
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistrer' }))
        .catch(error => res.status(400).json({ error }));
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
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

