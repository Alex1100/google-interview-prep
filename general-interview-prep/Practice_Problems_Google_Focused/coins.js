/*
 * Given an infinite number of quarters (25 cents), dimes(10 cents),
 * nickels (5 cents), and pennies (1 cent), write code to calculate the number
 * of ways of representing n cents.
**/


const cents_coins_combination = (cents = cents/100, coins = [25,10,5,1]) => {
  if (coins.length === 1) {
    return 1
  }
  let count = 0
  let current_coin = coins.shift()
  while(cents > current_coin) {
    count += cents_coins_combination(cents, coins)
    cents -= current_coin
  }
  count += cents_coins_combination(cents, coins)
  return count
}

console.log(cents_coins_combination(1000))
