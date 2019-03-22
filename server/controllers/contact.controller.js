var contactService = require('../services/contact.service');

exports.getContacts = async function (req, res) {
    try {
        let contacts = await contactService.getContacts();
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