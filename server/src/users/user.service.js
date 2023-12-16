const bcrypt = require('bcrypt');

const { ValidationError } = require('../shared/errors');
const { User } = require('./user.model');

const saltRounds = 10;

async function createUser(context, createUserDto) {
  const existingUser = await User.findOne({ email: createUserDto.email });
  if (existingUser) throw new ValidationError('User already exists');

  // Generate a salt and hash the new password
  const salt = await bcrypt.genSalt(saltRounds);
  createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

  // Creat user with hashed password
  const user = User.create(createUserDto);
  return user;
}

async function updateUser(context, updateUserDto) {
  const user = await User.findById(context.user.userId);
  if (!user) throw new ValidationError('User does not exists');

  if (updateUserDto.password) {
    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(saltRounds);
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
  }

  return User.findByIdAndUpdate(context.user.userId, updateUserDto, { new: true });
}

module.exports = {
  createUser,
  updateUser,
};
