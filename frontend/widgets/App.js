import React, { useState, Fragment } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Accordion from "./accordion/Accordion";
import AutoComplete from "./autocomplete/AutoComplete";

import "./App.css";

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState("accordion");

  const components = {
    accordion: Accordion,
    autocomplete: AutoComplete
  };

  const handleComponentSelect = e => {
    if (e.target && e.target.getAttribute("data-component-name")) {
      setSelectedComponent(e.target.getAttribute("data-component-name"));
    }
  };

  const renderSelectedComponent = () => {
    let Component = components[selectedComponent];
    return <Component />;
  };
  return (
    <Container className="p-3">
      <Jumbotron>
        <div>
          {Object.keys(components).map((key, index) => {
            return (
              <Fragment>
                <button
                  key={`btn_${key}_${index}`}
                  data-component-name={key}
                  onClick={handleComponentSelect}
                >
                  {key}
                </button>
              </Fragment>
            );
          })}
          {renderSelectedComponent()}
        </div>
      </Jumbotron>
    </Container>
  );
};

export default App;
