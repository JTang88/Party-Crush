import { observable, action } from 'mobx';
import { create, persist } from 'mobx-persist'


class Room {
  @persist('object') @observable details = { participants: [] }

  @action replaceDetails (details) {
    this.details = details;
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