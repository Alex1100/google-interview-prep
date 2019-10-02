let sample = 'Mr John Smith    ';

function convertString(str, strLength) {
  return sample
    .replace(/[\s]{2,}/g, '')
    .replace(/[\s]/g, '%20');
}

convertString(sample, 13);
