import { SecureStorage } from "./storage";
import constants from "./constants";

class UserData extends SecureStorage {
  constructor(key) {
    super(key);
  }
  get email() {
    return this.getUserData().email;
  }
  set email(email) {
    this.setUserData({ email });
  }
  get firstName() {
    return this.getUserData().firstName;
  }
  set firstName(firstName) {
    this.setUserData({ firstName });
  }
  get lastName() {
    return this.getUserData().lastName;
  }
  set lastName(lastName) {
    this.setUserData({ lastName });
  }
  get date() {
    return this.getUserData().date;
  }
  set date(date) {
    this.setUserData({ date });
  }
  get users() {
    return this.getUserData().users;
  }
  emailRegistered(email) {
    return !!this.getUser(email);
  }
  getUser(email) {
    return this.getUserData().users.filter(user => user.email === email)[0];
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
    if (this.emailRegistered(email)) {
      return false;
    }
    users.push({ firstName, lastName, email, date }); 
    this.setUserData({ users });
  }
}

export default new UserData(constants.SECURE_KEY);