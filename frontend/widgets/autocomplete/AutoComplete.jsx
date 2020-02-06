import React, { useState, useEffect } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import AutoCompleteInputSuggestions from "./AutoCompleteInputSuggestions";

const mockDB = [
  "apple",
  "apples",
  "appalaichan mountains",
  "application",
  "application programming",
  "appliances",
  "bar",
  "bargain",
  "bargains",
  "bargain shopping",
  "beer",
  "been"
];

export const mockAPICall = input => {
  if (!input) return [];
  return mockDB.filter(el => el.indexOf(input) >= 0 || el === input);
};

const AutoComplete = () => {
  const [searchedTerm, setSearchedTerm] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [inThrottle, setInThrottle] = useState(false);

  useEffect(() => {
    if (searchedTerm) {
      let res = suggestions;
      
      if (!inThrottle) {
        res = mockAPICall(searchedTerm);
        setInThrottle(true);
        setTimeout(() => setInThrottle(false), 1000)
      }

      setSuggestions(res);
    } else if (searchedTerm === "") {
      setSuggestions([]);
    }

    return () => setSuggestions([]);
  }, [searchedTerm]);

  const handleSearch = evt => {
    evt.persist();
    let val = evt.target.value;
    setSearchedTerm(val);
  };

  const autoCompleteInputProps = {
    searchedTerm: searchedTerm === null ? "" : searchedTerm,
    handleSearch
  };

  const autoCompleteInputSuggestionProps = {
    ...autoCompleteInputProps,
    suggestions
  };

  return (
    <div>
      <AutoCompleteInput {...autoCompleteInputProps} />
      <AutoCompleteInputSuggestions {...autoCompleteInputSuggestionProps} />
    </div>
  );
};

export default AutoComplete;
