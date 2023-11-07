/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  const donenessTemp = {
    chicken : 165,
    rareBeef : 125,
    meduimBeef : 138,
    wellBeef : 155
  }
  let isCooked = false;
  if (kind === 'chicken' && internalTemp >= donenessTemp.chicken) {
    isCooked = true;
  } else if (kind === 'beef') {
    if (doneness === 'rare' && internalTemp >= donenessTemp.rareBeef) {
      isCooked = true;
    } else if (doneness === 'medium' && internalTemp >= donenessTemp.meduimBeef) {
      isCooked = true;
    } else if (doneness === 'well' && internalTemp >= donenessTemp.wellBeef) {
      isCooked = true;
    }
  }
  return isCooked;
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true