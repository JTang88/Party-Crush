// const matchChose = (matches, participantId) => {
//   for (let i = 0; i < matches.length; i++) {
//     if (matches[i][participantId]) {
//       return true
//     }
//   }
//   return false;
// }

// export default matchChose;

const matchChose = (matches, participantId) => {
  // if (matches[participantId]) {
  //   return true
  // }
  // return false
  return !!matches[participantId]
}

export default matchChose;