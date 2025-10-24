/**
 * @param {string[]} emails
 * @return {number}
 */
 var numUniqueEmails = function(emails) {
  let m = {};
  emails.forEach(email => {
      let flag = true;
      while (email.split('@')[0].indexOf('.') > -1) {
          let z = email.split('@');
          z[0] = z[0].replace('.', '');
          email = z.join('@');
      }

      if (email.indexOf('+') > -1) {
          z = email.split('@');
          z[0] = z[0].split('+')[0];
          email = z.join('@');
      }
      
      m[email] = 1;

  })

  return Object.keys(m).length;
};