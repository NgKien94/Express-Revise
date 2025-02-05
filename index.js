const express = require('express')
const routeClient = require('./routes/client/index-route');
const routeAdmin = require("./routes/admin/index-route");
const systemConfig = require('./configs/system')
const methodOverride = require('method-override')



const testDB = require('./configs/test-database')

require('dotenv').config();


const app = express()
const port = process.env.PORT
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(methodOverride('_method'))


// Middleware để xử lý JSON từ request body
app.use(express.json());

// Middleware để xử lý dữ liệu từ form (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true })); 
/*
Dùng body parser không còn cần thiết nữa vì đã tích hợp vào express sau phiên bản express 4.16.0

*/



app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeClient(app);
routeAdmin(app);

testDB.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})