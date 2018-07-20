import { observable, action, computed, autorun, toJS, set } from 'mobx';

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
  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load () {
    let data = sessionStorage.getItem('RoomStore')
    if (data) {
      data = JSON.parse(data)
      set(this, data);
    }
  }

  save(json) {
    sessionStorage.setItem('RoomStore', json)
  }

  @observable details = {
    participants: [], 
    numberOfParticipants: 0,
    matches: {},
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
    return Object.keys(this.details.matches).length > 0 && Object.keys(this.details.matches).length === Number(this.details.numberOfParticipants)
  }
}


const RoomStore = new Room();

export default RoomStore;