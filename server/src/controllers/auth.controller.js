const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const {
      fullName = "",
      email = "",
      password = "",
      confirmPassword = ""
    } = req.body;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Ho ten, email va mat khau la bat buoc"
      });
    }

    if (password.trim().length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mat khau phai co it nhat 6 ky tu"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Xac nhan mat khau khong khop"
      });
    }

    const result = await authService.register({
      fullName,
      email,
      password
    });

    return res.status(201).json({
      success: true,
      message: "Dang ky thanh cong",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email va mat khau la bat buoc"
      });
    }

    const result = await authService.login({ email, password });

    return res.status(200).json({
      success: true,
      message: "Dang nhap thanh cong",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfileById(req.user.id);

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Dang xuat thanh cong"
  });
};

module.exports = {
  register,
  login,
  getProfile,
  logout
};
