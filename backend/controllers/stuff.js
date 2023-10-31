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

exports.getOneThing = async (req, res, next) => {
    try {
        const id = req.params.id;

        Thing.findOne(id)
            .then((thing) => {
                if (thing && thing[0] && thing[0].length > 0) {
                    res.status(200).json(thing[0]);
                } else {
                    res.status(404).json({ message: 'Objet non trouvé' });
                }
            })
            .catch((error) => {
                console.error("Error when retrieving the item:", error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteThing = async (req, res, next) => {
    try {
        const userId = req.body.userId ? req.body.userId : null;
        const thingAuthorId = req.body.thingAuthorId ? req.body.thingAuthorId.toString() : null;

        if (userId !== req.userID || thingAuthorId !== req.userID) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        Thing.deleteOne(req.params.id)
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.modifyThing = async (req, res, next) => {
    try {
        const { id, newTitle, newDescription, newImageUrl, newPrice } = req.body;
        const userId = req.body.userId ? req.body.userId : null;
        const thingAuthorId = req.body.thingAuthorId ? req.body.thingAuthorId.toString() : null;
        if (userId !== req.userID || thingAuthorId !== req.userID) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await Thing.updateOne(id, newTitle, newDescription, newImageUrl, newPrice)
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


