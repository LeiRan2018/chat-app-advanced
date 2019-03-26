var contactService = require('../services/contact.service');

exports.getContacts = async function (req, res) {
    try {
        let data = req.body.data;
        let contacts = await contactService.getContacts();
        contacts.splice(contacts.findIndex(el => {
            return el.email == data;
        }), 1);
        return res
            .status(200)
            .json({
                status: 200, data: {
                    contacts: contacts
                }, message: "successfully"
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getFriends = async function (req, res) {
    try {
        let data = req.body.data;
        console.log(data);
        let friends = await contactService.getFriends(data);
        return res
            .status(200)
            .json({
                status: 200, data: {
                    friends: friends
                }, message: "successfully"
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message }); 
    }
}