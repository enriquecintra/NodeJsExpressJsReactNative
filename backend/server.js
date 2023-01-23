
require('dotenv').config({ path: '.env' });


const app = require('./src/app');

const PORT = normalizaPort(process.env.PORT || '3000');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


const cors = require('cors');
// get MongoDB driver connection
const dbo = require('./db/conn');


app.use(cors());


// Global error handling
//app.use(function (err, _req, res) {

//    console.log("Erro =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.message);
//    res.status(500).send('Something broke!');
//});

dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});