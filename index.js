import userData from './services/userdata';
import mock from './mock.data';

const users = JSON.parse(mock);

const data = {
  currentStep: 12,
  date: "2010-03-25T22:00:00.000Z",
  email: "smarodina@nhl.xsl",
  firstName: "Oi",
  lastName: "Smereko"
}

//userData.clearStorage();
//userData.setUserData({users}); 
//userData.setUserData(data);

console.log(userData.getUserData());
console.log(`-------------------------------------`);
console.log(userData.saveNewUser());
