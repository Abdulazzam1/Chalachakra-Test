const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error untuk debugging

  // Cek jika error validasi Sequelize
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({
      message: 'Validation failed',
      errors: messages
    });
  }

  // Error umum
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
};

module.exports = errorHandler;