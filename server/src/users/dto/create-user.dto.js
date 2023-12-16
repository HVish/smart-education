const z = require('zod');
const { UserRole } = require('../user.constants');

const createUserDto = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  photo: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

module.exports = { createUserDto };
