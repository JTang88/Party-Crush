import { observable, action } from 'mobx';
import { create, persist } from 'mobx-persist'

class CurrentUser {
  @persist('object') @observable currentUserDetails = {}
  @persist @observable host = false
  @persist('object') @observable participantAdded = false

  @action toggleParticipantAdded = () => {
    console.log('here is participantAdded before toggle', this.participantAdded)
    this.participantAdded = true;
    console.log('here is participantAdded after toggle', this.participantAdded)
  }

  @action setCurrentUserDetails(currentUserDetails) {
    this.currentUserDetails = currentUserDetails;
  }
}

const hydrate = create({
  storage: localStorage, 
  jsonify: true,  
})

const CurrentUserStore = new CurrentUser();

export default CurrentUserStore;

hydrate('CurrentUserStore', CurrentUserStore)
  .then(() => console.log('CurrentUserStore hydrated'))