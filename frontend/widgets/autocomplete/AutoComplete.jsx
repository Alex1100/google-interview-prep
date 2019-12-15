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
  return mockDB.filter(el => el.indexOf(input) >= 0);
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const AutoComplete = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    throttle(
      setTimeout(() => setSuggestions(mockAPICall(searchedTerm)), 500),
      500
    );
    return () => setSuggestions([]);
  }, [searchedTerm]);

  const handleSearch = evt => {
    evt.persist();
    let val = evt.target.value;
    setSearchedTerm(val);
  };

  const autoCompleteInputProps = {
    searchedTerm,
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
