import { observable, action, computed } from 'mobx';
import { create, persist } from 'mobx-persist'


class Room {
  @persist('object') @observable details = { 
    participants: [], 
    numberOfParticipants: 0,
  }

  @action replaceRoomDetails = (roomDetails) => {
    this.details = roomDetails;
  }

  @computed get participantsToCome () {
    return Number(this.details.numberOfParticipants) - this.details.participants.length 
  } 
}

const hydrate = create({
  storage: localStorage,
  jsonify: true,
})

const RoomStore = new Room();

export default RoomStore;

hydrate('RoomStore', RoomStore)
  .then(() => console.log('RoomStore hydrated'))