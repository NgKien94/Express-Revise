const express = require('express')
const routeClient = require('./routes/client/index-route');
const routeAdmin = require("./routes/admin/index-route");
const systemConfig = require('./configs/system')

const testDB = require('./configs/test-database')

require('dotenv').config();


const app = express()
const port = process.env.PORT
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeClient(app);
routeAdmin(app);

testDB.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})