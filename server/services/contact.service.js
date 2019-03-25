const User = require('../models/user');

exports.getContacts = async function () {
    try {

        let contacts =  await User.findAll();
        let sortContacts = contacts.map(el => {
            let obj = {};
            obj['email'] = el.email;
            obj['userId'] = el.userID;
            return obj;
        });
        return sortContacts;
    }catch (e) {
        throw Error('error occured while getting contacts');
    }
}