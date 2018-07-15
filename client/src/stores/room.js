import { observable, action, computed, autorun, toJS, extendObservable } from 'mobx';


let count = 0;

function autoSave(store, save) {
  let firstRun = true;
  autorun(() => {
    console.log('here is count', count++)
    const json = JSON.stringify(toJS(store));
    if (!firstRun) {
      save(json);
    }
    firstRun = false;
  });
}


class Room {
  @observable details = {
    participants: [], 
    numberOfParticipants: 0,
  }

  @action replaceRoomDetails = (roomDetails) => {
    this.details = roomDetails;
  }

  @computed get participantsToCome () {
    return Number(this.details.numberOfParticipants) - this.details.participants.length 
  } 

  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load() {
    let data = sessionStorage.getItem('RoomStore')
    if (data) {
      data = JSON.parse(data)
      extendObservable(this, data);
    }
  }

  save(json) {
    sessionStorage.setItem('RoomStore', json)
  }
}


const RoomStore = new Room();

export default RoomStore;


// import { observable, action, computed } from 'mobx';
// import { create, persist } from 'mobx-persist'


// class Room {
//   @persist('object') @observable details = { 
//     participants: [], 
//     numberOfParticipants: 0,
//   }

//   @action replaceRoomDetails = (roomDetails) => {
//     this.details = roomDetails;
//   }

//   @computed get participantsToCome () {
//     return Number(this.details.numberOfParticipants) - this.details.participants.length 
//   } 
// }

// const hydrate = create({
//   storage: localStorage,
//   jsonify: true,
// })

// const RoomStore = new Room();

// export default RoomStore;

// hydrate('RoomStore', RoomStore)
//   .then(() => console.log('RoomStore hydrated'))