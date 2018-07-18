import { toJS } from 'mobx';

const getMatches = (matches) => {
  const matchesCopy = Object.assign({}, matches)
  const matchedIds = [];

  for (let x in matchesCopy) {
    // console.log('here is matchesCopy[x]', matchesCopy[x])
    // console.log('here is matchesCopy[matchesCopy[x]]', matchesCopy[matchesCopy[x]])
    if (x === matchesCopy[matchesCopy[x]]) {
      matchedIds.push({ [x]: matchesCopy[x] })
      delete matchesCopy[x]
    }
  }
  console.log('here is matchesCopy', toJS(matchesCopy))
  return matchedIds
}

export default getMatches;