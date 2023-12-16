const { createUserDto } = require('./create-user.dto');

const updateUserDto = createUserDto.partial().omit({
  email: true,
  role: true,
});

module.exports = { updateUserDto };
