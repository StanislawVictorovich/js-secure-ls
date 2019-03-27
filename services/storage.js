import SecureLS from "secure-ls";

export class SecureStorage {
  constructor(key) {
    this.storage_id = key;
    this.secureStorage = new SecureLS({
      encodingType: "base64",
      isCompression: true
    });
  }
  setUserData(user) {
    const storedUser = this.getUserData();

    for (let key in storedUser) {
      if (user[key] === undefined) {
        user[key] = storedUser[key];
      }
    }
    
    this.secureStorage.set(this.storage_id, JSON.stringify(user));
  }
  getUserData() {
    try {
      return JSON.parse(this.secureStorage.get(this.storage_id));
    } catch (e) {
      return {};
    }
  }
  clearStorage() {
    this.secureStorage.clear();
  }
}