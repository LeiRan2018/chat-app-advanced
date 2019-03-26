const User = require('../models/user');
const Friend = require('../models/friend');

exports.getContacts = async function () {
    try {

        let contacts = await User.findAll();
        let sortContacts = contacts.map(el => {
            let obj = {};
            obj['email'] = el.email;
            obj['userId'] = el.userID;
            return obj;
        });
        return sortContacts;
    } catch (e) {
        throw Error('error occured while getting contacts');
    }
}

exports.getFriends = async function (data) {
    try {
        
        return await Friend.findAll({ where: { email: data } });
    } catch (e) {
        throw Error('error occured while getting friends');
    }
}