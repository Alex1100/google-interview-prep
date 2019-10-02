var repeatedSubstringPattern = function(s) {
    return (s + s).indexOf(s, 1) < s.length;
};
