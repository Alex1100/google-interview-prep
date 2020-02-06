import React from "react";

const AutoCompleteInputSuggestions = ({ searchedTerm, suggestions }) => {
  return (
    <div>
      {suggestions.map((suggestion, index) => {
        return (
          <p key={`${searchedTerm}_${suggestion}_${index}`}>{suggestion}</p>
        );
      })}
    </div>
  );
};

export default AutoCompleteInputSuggestions;
