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
    const { users } = this.getUserData();
    if (users) {
      return this.getUserData().users.filter(user => user.email === email)[0];
    } else {
      return false;
    }
  }
  getUserAnswer(email, questionId) {
    const user = this.getUser(email);
    if (user) {
      return user.answersMatrix[user.questionsIdMatrix.indexOf(questionId)];
    } else {
      return false;
    }
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
