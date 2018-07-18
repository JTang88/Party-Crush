import { observable, action, computed, autorun, toJS, extendObservable } from 'mobx';

function autoSave(store, save) {
  let firstRun = true;
  autorun(() => {
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
    matches: [],
  }

  @observable animationRan = false

  @action toggleAnimationRan = () => {
    this.animationRan = !this.animationRan;
  }

  @action addMatch = (match) => {
    this.details.matchs.push(match);
  }

  @action replaceRoomDetails = (roomDetails) => {
    this.details = roomDetails;
  }

  @computed get participantsToCome () {
    return Number(this.details.numberOfParticipants) - this.details.participants.length 
  } 

  @computed get allhaveChosenCrush() {
    return this.details.matches.length > 0 && this.details.matches.length === Number(this.details.numberOfParticipants)
  }

  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load = async () => {
    let data = sessionStorage.getItem('RoomStore')
    if (data) {
      data = JSON.parse(data)
      await extendObservable(this, data);
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