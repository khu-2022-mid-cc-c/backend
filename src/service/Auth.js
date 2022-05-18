const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Auth {
  constructor(database) {
    this.database = database;
  }

  async Login(id, password) {
    const user = (await this.database.query(`SELECT id, user_password FROM user WHERE user_id = ?`, [id]))[0];
    if (user.length < 1) {
      throw new Error('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user[0]['user_password'])) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign({ id: user[0]['id'] }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  async Signup(id, password, nickname, isGuest = false) {
    const existingInfo = (await this.database.query(`SELECT user_id, user_nickname FROM user WHERE user_id = ? OR user_nickname = ?`, [id, nickname]))[0];
    if (existingInfo.length > 0) {
      if (existingInfo[0]['user_id'] === id) {
        throw new Error('ID already exists');
      } else {
        throw new Error('Nickname already exists');
      }
    }

    if (!isGuest && (id.indexOf('GUEST_') !== -1 || nickname.indexOf('GUEST_') !== -1)) {
      throw new Error('Forbidden word contained');
    }

    await this.database.query(`INSERT INTO user(user_id, user_password, user_guest, user_nickname) VALUES(?, ?, ?, ?)`, [
      id, bcrypt.hashSync(password, 12), isGuest ? 1 : 0, nickname
    ]);
  }

  async GuestLogin() {
    const availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'GUEST_', password = '', nickname = 'GUEST_';
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        id += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      }
      if (i < 8) {
        nickname += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      }
      password += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    }

    await this.Signup(id, password, nickname, true);

    return {
      id,
      password,
    };
  }
}

module.exports = Auth;
