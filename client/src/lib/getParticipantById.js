const getParticipantById = (id, participants) => {
  for (let i = 0; i < participants.length; i++) {
    if (participants[i].id === id) {
      return participants[i]
    }
  } 
}

export default getParticipantById;