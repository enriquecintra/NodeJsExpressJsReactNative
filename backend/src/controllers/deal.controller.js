const BaseController = require('./base.controller');

class DealController extends BaseController {
    constructor() {
        super("deals")
    }
    search = async (req, res) => {
        //teste de herança
        
            const dbConnect = this._dbo.getDb();
            let entity = await dbConnect
                .collection(this._collection)
                .find()
                .toArray(function (err, docs) {
                    if (err) {
                        // Reject the Promise with an error
                        res.status(403).send(err.message);
                    }
                    res.status(200).json(docs);
                });
    };
}

module.exports = new DealController();