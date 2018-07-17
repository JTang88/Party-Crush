export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = {};
  }

  findOrCreate({ roomId, numberOfParticipants }) {
    let room = this.store[roomId];
    if (!room) {
      room = {};
      room.id = roomId;
      room.participants = [];
      room.matches = [];
      room.numberOfParticipants = numberOfParticipants
      this.store[roomId] = room;
    } 
    return room;
  }

  
}