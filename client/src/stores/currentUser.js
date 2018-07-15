import { observable, action, autorun, toJS, extendObservable } from 'mobx';

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

class CurrentUser {
  @observable currentUserDetails = {}
  @observable participantAdded = false

  @action toggleParticipantAdded = () => {
    console.log('here is participantAdded before toggle', this.participantAdded)
    this.participantAdded = true;
    console.log('here is participantAdded after toggle', this.participantAdded)
  }

  @action setCurrentUserDetails = (currentUserDetails) => {
    this.currentUserDetails = currentUserDetails;
  }

  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load() {
    let data = sessionStorage.getItem('CurrentUserStore')
    if (data) {
      data = JSON.parse(data)
      extendObservable(this, data);
    }
  }

  save(json) {
    sessionStorage.setItem('CurrentUserStore', json)
    console.log(json);
  }
}


const CurrentUserStore = new CurrentUser();

export default CurrentUserStore;


// import { observable, action } from 'mobx';
// import { create, persist } from 'mobx-persist'

// class CurrentUser {
//   @persist('object') @observable currentUserDetails = {}
//   // @persist @observable host = false
//   @persist('object') @observable participantAdded = false

//   @action toggleParticipantAdded = () => {
//     console.log('here is participantAdded before toggle', this.participantAdded)
//     this.participantAdded = true;
//     console.log('here is participantAdded after toggle', this.participantAdded)
//   }

//   @action setCurrentUserDetails(currentUserDetails) {
//     this.currentUserDetails = currentUserDetails;
//   }
// }

// const hydrate = create({
//   storage: localStorage, 
//   jsonify: true,  
// })

// const CurrentUserStore = new CurrentUser();

// export default CurrentUserStore;

// hydrate('CurrentUserStore', CurrentUserStore)
//   .then(() => console.log('CurrentUserStore hydrated'))