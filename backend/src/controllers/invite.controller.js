const dbo = require('../../db/conn');
const { ObjectId } = require('mongodb');
class InviteController {
    constructor() {
    }

    get = async (req, res) => {
        if (req.params.userId && req.params.id) {
            const dbConnect = dbo.getDb();
            let entity = await dbConnect
                .collection("invites")
                .findOne({ user: req.params.userId, _id: req.params.id });
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

    list = async (req, res) => {
        if (req.params.userId !== "") {
            const dbConnect = dbo.getDb();
            let entity = await dbConnect

                .collection("invites")
                .find({ user: req.params.userId })
                .toArray(function (err, docs) {
                    if (err) {
                        // Reject the Promise with an error
                        res.status(403).send(err.message);
                    }
                    if (docs.length > 0) {
                        res.status(200).json(docs);
                    } else {
                        res.status(204);
                    }
                });
            
        } else {
            res.status(403).json({ message: "Not found!" });
        }
    };

    post = async (req, res, next) => {

        if (req.params.userId) {
            const dbConnect = dbo.getDb();
            dbConnect
                .collection("invites")
                .insertOne(req.body, function (err, result) {
                    if (err) {
                        res.status(400).send('Error inserting matches!' + err);
                    } else {
                        console.log(`Added a new match with id ${result.insertedId}`);
                        res.status(201).send();
                    }
                });
        } else {
            res.status(403).json({ message: "Not found!" });
        }
    }

    put = async (req, res, next) => { }
}

module.exports = new InviteController();