const Users = require('../models/users.model');

async function authAdmin(req, res, next) {
    try {
        const user = await Users.findOne({
            _id: req.user.id,
        });
        if (!user)
            return res.status(400).json({ msg: 'Không tìm thấy người dùng' });
        if (user.role === 0) {
            return res.status(400).json({
                msg: 'Quyền truy cập tài nguyên quản trị viên bị từ chối',
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            err: err.messages,
            error: 'error at authAdmin',
        });
    }
}

module.exports = authAdmin;
