import SecureLS from "secure-ls";

export class SecureStorage {
  constructor(key, encodingType) {
    this.storage_id = key;
    this.secureStorage = new SecureLS({
      encodingType,
      isCompression: true
    });
  }
  setUserData(data) {
    const storedUser = this.getUserData();

    for (let key in storedUser) {
      if (data[key] === void('property not exists')) {
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
