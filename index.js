require('dotenv').config();
const express = require('express')

const path = require('path')
const routeClient = require('./routes/client/index-route');
const routeAdmin = require("./routes/admin/index-route");
const systemConfig = require('./configs/system')
const methodOverride = require('method-override')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const testDB = require('./configs/test-database')




const app = express()
const port = process.env.PORT

app.set('views',`${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))


// Middleware để xử lý JSON từ request body
app.use(express.json());

// Middleware để xử lý dữ liệu từ form (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
/*
Dùng body parser không còn cần thiết nữa vì đã tích hợp vào express sau phiên bản express 4.16.0

*/

app.locals.prefixAdmin = systemConfig.prefixAdmin; // biến toàn cục trên toàn bộ dự án, có thể dùng trong view

/* 
  Hiển thị thông báo khi bằng session
  Example: hiển thị thông báo lỗi đăng nhập, đăng nhập thành công, cập nhật dữ liệu thành công.....
*/
app.use(cookieParser("ABCDEFK"))
app.use(session({
  secret: 'ABC123', // Chìa khóa bí mật cho session
  resave: false, // Không lưu lại phiên nếu không có thay đổi
  saveUninitialized: true, // Lưu phiên mặc dù không có gì thay đổi
  cookie: { maxAge: 60000 } // Thời gian tồn tại của cookie (60000ms = 1 phút)
}));
app.use(flash());

// Tiny MCE - Editor input fields
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End Tiny MCE- Editor input fields

routeClient(app);
routeAdmin(app);

testDB.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})