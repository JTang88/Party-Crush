export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = {};
  }

  findOrCreate({ roomId, numberOfParticipants, currentUserDetails }) {
    let room = this.store[roomId];
    if (!room) {
      room = {};
      room.id = roomId;
      room.numberOfParticipants = numberOfParticipants
      room.currentUsers = [];
      room.currentUsers.push(currentUserDetails)
      this.store[roomId] = room;
    }
    return room;
  }
}