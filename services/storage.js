import SecureLS from "secure-ls";

export class SecureStorage {
  constructor(key) {
    this.storage_id = key;
    this.secureStorage = new SecureLS({
      encodingType: "base64",
      isCompression: true
    });
  }
  setUserData(data) {
    const storedUser = this.getUserData();

    for (let key in storedUser) {
      if (data[key] === undefined) {
        data[key] = storedUser[key];
      }
    }
    
    this.secureStorage.set(this.storage_id, JSON.stringify(data));
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