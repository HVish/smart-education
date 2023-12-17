const { UnauthenticatedError } = require('../shared/errors');
const { User } = require('../users/user.model');
const { generateToken, getProfileData } = require('../utils/jwt');

async function loginUser(context, loginUserDto) {
  const user = await User.findOne({ email: loginUserDto.email }).select('+password');
  const match = await user.comparePassword(loginUserDto.password);
  if (!user || !match) throw new UnauthenticatedError('Invalid credentials');
  const token = generateToken(user);
  const profile = getProfileData(user);
  return { token, profile };
}

module.exports = {
  loginUser,
};
