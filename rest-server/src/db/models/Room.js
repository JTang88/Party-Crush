import mongoose from 'mongoose';
import shortId from 'shortid'

const RoomSchema = mongoose.Schema({
  _id: {
    type: String,
    'default': shortId.generate
  },
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;