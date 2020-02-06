import React, { useState, Fragment } from "react";
import Section from "./Section";

const Accordion = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const handleClick = keyIndex => {
    setSelectedSection(keyIndex);
  };

  const accordionProps = {
    handleClick,
    sections: [
      {
        title: "Section 1",
        content: (
          <p>
            Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
            Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
            condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
            Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit
            eu ante scelerisque vulputate.
          </p>
        )
      },
      {
        title: "Section 2",
        content: (
          <p>
            Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
            Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
            condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
            Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit
            eu ante scelerisque vulputate.
          </p>
        )
      },
      {
        title: "Section 3",
        content: (
          <p>
            Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
            Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
            condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
            Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit
            eu ante scelerisque vulputate.
          </p>
        )
      },
      {
        title: "Section 4",
        content: (
          <p>
            Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
            Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
            condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
            Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit
            eu ante scelerisque vulputate.
          </p>
        )
      }
    ],
    selectedSection
  };
  return (
    <Fragment>
      {accordionProps.sections.map((section, i) => {
        const handler = () => accordionProps.handleClick(i);
        return (
          <Fragment>
            <Section
              {...{
                section: accordionProps.sections[i],
                selectedSection,
                keyIdx: i,
                handler
              }}
              key={`section_${i}_${accordionProps.sections[i].title}`}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Accordion;
