import shortId from 'shortid';
import Room from '../db/models/Room';


export const fetchNewRoomId = async (req, res) => {
  console.log('inside of fetchNewRoomId')
  try {
    let roomId = shortId.generate();
    const newRoom = await new Room({ _id: roomId, numberOfParticipants: req.body.numberOfParticipants });
    await newRoom.save();
    console.log('Room successfully created');
    return res.status(200).json({
      success: true,
      roomId,
    });
  } catch (e) {
    console.log('error fetching newRoomId', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
};

export const verifyParty = async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomId);
    if (room)
      return res.status(200).json({
        success: true,
        exist: true,
        numberOfParticipants: room.numberOfParticipants,
        roomId: room._id
    });
    return res.status(200).json({
      success: true,
      exist: false,
    });
  } catch(e) {
    console.log('error verifying roomId', e);
    return res.status(400).json({
      success: false,
      e,
    });
  }
}

export const deleteRoom = async (req, res) => {
  Room.findByIdAndRemove(req.query.roomId, () => {
    res.status(200).json({
      success: true,
    });
  })
}