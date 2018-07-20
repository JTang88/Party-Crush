import { observable, action, autorun, toJS, set } from 'mobx';

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
  constructor() {
    this.load();
    autoSave(this, this.save.bind(this));
  }

  load() {
    let data = sessionStorage.getItem('CurrentUserStore')
    if (data) {
      data = JSON.parse(data)
      set(this, data);
    }
  }

  save(json) {
    sessionStorage.setItem('CurrentUserStore', json)
    console.log(json);
  }

  @observable currentUserDetails = {}
  @observable participantAdded = false

  @action toggleParticipantAdded = () => {
    this.participantAdded = true;
  }

  @action setCurrentUserDetails = (currentUserDetails) => {
    this.currentUserDetails = currentUserDetails;
  }

}


const CurrentUserStore = new CurrentUser();

export default CurrentUserStore;