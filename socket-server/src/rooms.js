export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = {};
  }

  findOrCreate(roomId, participants) {
    let room = this.store[roomId];
    if (!room) {
      room = {};
      // now mirror the obj for matchings
      room.id = roomId;
      room.participants = participants
      
      this.store[roomId] = room;
    }
    return room;
  }
}