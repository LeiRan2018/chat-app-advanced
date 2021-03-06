var oneService = require("../services/one.service");


exports.postone = async function (req, res) {
  try {
    var data = req.body.data;
    //split the usercombination and then assgining to user1 and user2
    user1 = data[0];
    user2 = data[1];
    //check if there is room exsited using these two users
    tempcomb1 = await oneService.exit(user1 + user2);
    tempcomb2 = await oneService.exit(user2 + user1);
    //get this room ID if existed else creating a new
    let chatroom;
    chatroom = tempcomb1 ? tempcomb1 : tempcomb2 ? tempcomb2 : await oneService.createroom(user1 + user2);
    //get history message for this room in message table
    var message = await oneService.gethistory(chatroom.chatRoomID);
    return res
      .status(200)
      .json({
        status: 200, data: {
          roomID: chatroom.chatRoomID,
          message: message
        }, message: "successfully"
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.addUser = async function (req, res) {
  try {
    let data = req.body.data;
    await oneService.addUser(data);
    return res
      .status(200)
      .json({
        status: 200, message: "successfully"
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getHistory = async function (req, res) {
  try {
    let data = req.body.data;
    console.log(data);
    let history = await oneService.getHistory(data);
    return res
      .status(200)
      .json({
        status: 200, data: {
          history: history
        }, message: "successfully"
      });
  } catch (e) {

  }
}