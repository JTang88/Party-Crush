import { observable, action } from 'mobx';

class Room {
  @observable details = {}

  @action replaceDetails (details) {
    this.details = details;
  } 
}

const RoomStore = new Room();

export default RoomStore;