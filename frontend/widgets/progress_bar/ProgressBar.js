import React, { Fragment } from 'react';

const ProgressBar = ({ displayPercentageNumber = false, progressPercentage, defaultColor = "darkseagreen" }) => (
  <Fragment>
    {displayPercentageNumber && <h1 style={{ textAlign: "center" }}>{progressPercentage}% complete</h1>}
    <div style={{
      display: "inline-flex",
      backgroundColor: "lightgrey",
      border: "2px",
      borderRadius: "12px",
      width: "100%",
      height: "28px"
    }}>
      <div style={{
        display: "inline-flex",
        backgroundColor: defaultColor,
        borderRadius: "10px",
        border: "solid 2px white",
        width: `${progressPercentage}%`,
        height: "28px"
      }} />
    </div>
  </Fragment>
);


export default ProgressBar;
