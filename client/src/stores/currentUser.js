import { observable, action } from 'mobx';

class CurrentUser {
  @observable numberOfParticipants = 0
  @observable currentUserDetails = {}
  @observable host = false;

  @action setNumberOfParticipants(numberOfParticipants) {
    this.numberOfParticipants = numberOfParticipants;
  }

  @action setCurrentUserDetails(currentUserDetails) {
    this.currentUserDetails = currentUserDetails;
  }

}


// class CurrentUser {
//   @observable numberOfParticipants = 0
//   @observable currentUserDetails = []

//   @action setCurrentUserDetails(currentUserDetails) {
//     this.currentUserDetails.push(currentUserDetails);
//   }

// }

const CurrentUserStore = new CurrentUser();

export default CurrentUserStore;