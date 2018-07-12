import { observable, action } from 'mobx';
import { create, persist } from 'mobx-persist'

class CurrentUser {
  @persist @observable numberOfParticipants = 0
  @persist('object') @observable currentUserDetails = {}
  @persist @observable host = false
  @persist @observable participantAdded = false

  @action setNumberOfParticipants(numberOfParticipants) {
    this.numberOfParticipants = numberOfParticipants;
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