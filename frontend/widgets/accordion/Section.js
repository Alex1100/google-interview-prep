import React from "react";

const Section = ({
  handler,
  section: { content, title },
  keyIdx,
  selectedSection
}) => {
  const isSelected = selectedSection === keyIdx;

  return (
    <div>
      <div
        onClick={handler}
        style={{
          backgroundColor: isSelected ? "#3281f7" : "white",
          border: `solid 1px ${isSelected ? "transparent" : "grey"}`,
          borderRadius: "4px",
          marginTop: "1%",
          borderBottomLeftRadius: isSelected ? 0 : "4px",
          borderBottomRightRadius: isSelected ? 0 : "4px",
          padding: "2%",
          cursor: isSelected ? "text" : "pointer"
        }}
      >
        <h2
          style={{
            fontSize: "80%",
            color: isSelected ? "white" : "black"
          }}
        >
          {title}
        </h2>
      </div>
      {isSelected && (
        <>
          <div
            style={{
              border: "solid 1px grey",
              display: "block",
              position: "relative"
            }}
          >
            <span
              style={{
                display: "block",
                position: "relative",
                margin: "5%"
              }}
            >
              {content}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Section;
