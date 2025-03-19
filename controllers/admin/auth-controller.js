const Account = require('../../models/account-model')
const systemConfig = require('../../configs/system')
const md5 = require('md5')


module.exports.index = async (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        return;
    }
    else {
        res.render('admin/pages/auth/login.pug', {
            pageTitle: 'Đăng nhập'
        })
    }


}


module.exports.login = async (req, res) => {
    const user = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if (!user) {
        req.flash('error', 'User không tồn tại');
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }
    if (md5(req.body.password) != user.password) {
        req.flash('error', 'Sai mật khẩu');
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    if (user.status == "inactive") {
        req.flash('error', 'Tài khoản đã dừng hoạt động');
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    res.cookie('token', user.token);
    req.flash('success', 'Đăng nhập thành công')
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)

}


module.exports.logout = (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logout thành công')
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}