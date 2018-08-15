
const isSubstring = (str1, str2) => {
  return str1.indexOf(str2) !== -1;
}

const stringRotation = (str1, str2) => {
  return isSubstring(str1 + str1, str2);
}

console.log(stringRotation('waterbottle', 'waterbottlewat'));
