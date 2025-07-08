import * as sshKey from './sshKey.json';
import * as crypto from 'crypto';

class HashManager {
  hashPassword(password: string, salt: any) {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
      .toString('base64');
  }

  generateSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  passwordEncode(password: string) {
    const salt = Buffer.from(sshKey['SSH_PASSWORD_KEY'], 'base64');
    return this.hashPassword(password, salt);
  }
}

export default new HashManager();
