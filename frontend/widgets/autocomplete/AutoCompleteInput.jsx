import React from "react";

const AutoCompleteInput = ({ handleSearch }) => {
  return (
    <div>
      <label htmlFor="autocomplete-input" />
      <input name="autocomplete-input" onKeyUp={handleSearch} />
    </div>
  );
};

export default AutoCompleteInput;
