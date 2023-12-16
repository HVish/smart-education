const z = require('zod');

const loginUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = { loginUserDto };
