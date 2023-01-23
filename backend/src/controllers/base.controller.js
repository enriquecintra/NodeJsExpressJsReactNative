const dbo = require('../../db/conn');
const { ObjectId } = require('mongodb');

class BaseController {

    _collection = "";
    _dbo = dbo;
    constructor(collection) {
        this._collection = collection;
    }

    get = async (req, res) => {
        if (req.params.id) {
            const dbConnect = dbo.getDb();
            let entity = await dbConnect
                .collection(this._collection)
                .findOne({ _id: new ObjectId(req.params.id) });

            try {
                delete entity.password;
            } catch (e) {
                console.log(e);
            }

            res.status(200).json(entity);
        } else {
            res.status(403).json({ message: "Not found!" });
        }
    };
    post = async (req, res, next) => {

        const dbConnect = dbo.getDb();
        dbConnect
            .collection(this._collection)
            .insertOne(req.body, function (err, result) {
                if (err) {
                    res.status(400).send('Error inserting matches!' + err);
                } else {
                    console.log(`Added a new match with id ${result.insertedId}`);
                    res.status(201).send();
                }
            });
    }
    put = async (req, res, next) => {
        delete req.body._id;
        const dbConnect = dbo.getDb();
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: req.body,
        };

        dbConnect
            .collection(this._collection)
            .updateOne(query, updates, function (err, _result) {
                if (err) {
                    res
                        .status(400)
                        .send(`Error updating likes on listing with id ${query._id}!`);
                } else {
                    res.status(200).json(_result);
                }
            });
    };
}

module.exports = BaseController;