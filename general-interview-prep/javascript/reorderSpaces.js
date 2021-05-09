/**
 * @param {string} text
 * @return {string}
 */
 var reorderSpaces = function(text) {
  const words = text.trim().split(' ').filter((word) => word.length);
  let totalSpaces = 0;
  for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ')
          totalSpaces++;
  }
  const spaceLength = words.length === 1 ? -1 : Math.floor(totalSpaces/(words.length-1)),
        extraSpaceLength = words.length === 1 ? totalSpaces : totalSpaces % (words.length-1);
  
  let spaces = '';
  for (let i = 0; i < spaceLength; i++)
      spaces += ' ';
  
  let extra = '';
  for (let i = 0; i < extraSpaceLength; i++)
      extra += ' '
  
  return words.join(spaces) + extra;
};