import { SecureStorage } from "./storage";
import types from "./types";

class UserData extends SecureStorage {
  constructor(key) {
    super(key);
    types.STORAGE_FIELDS.forEach(item => {
      Object.defineProperty(this, item, {
        get() {
          return this.getUserData()[item];
        },
        set(value) {
          this.setUserData(new function() { 
            this[item] = value;
          })
        }
      });
    });
  }
  emailRegistered(email) {
    return !!this.getUser(email);
  }
  getUser(email) {
    return this.getUserData() ? this.getUserData().users.filter(user => user.email === email)[0] : false;
  }
  getUserAnswer(email, questionId) {
    const user = this.getUser(email);
    return user ? user.answersMatrix[user.questionsIdMatrix.indexOf(questionId)] : false;
  }
  saveNewUser() {
    const { firstName, lastName, email, date, users } = this.getUserData();
    if (this.emailRegistered(email) || !users) {
      return false;
    }
    users.push({ firstName, lastName, email, date });
    this.setUserData({ users });
  }
}

export default new UserData(types.SECURE_KEY);
