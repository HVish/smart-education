const { UnauthenticatedError } = require('../shared/errors');
const { User } = require('../users/user.model');
const { generateToken } = require('../utils/jwt');

async function loginUser(context, loginUserDto) {
  const user = await User.findOne({ email: loginUserDto.email }).select('+password');
  const match = await user.comparePassword(loginUserDto.password);
  if (!user || !match) throw new UnauthenticatedError('Invalid credentials');
  return generateToken(user);
}

module.exports = {
  loginUser,
};
