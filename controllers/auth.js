const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(password, user.password);
    if (!esValida) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      usuario: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
};
