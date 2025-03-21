const bcrypt = require('bcrypt');

async function generateHash() {
  try {
    const password = 'password123';
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Generated Hash:', hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
