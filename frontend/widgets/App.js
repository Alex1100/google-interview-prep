import React, { useState, Fragment } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Accordion from "./accordion/Accordion";
import AutoComplete from "./autocomplete/AutoComplete";
import ProgressBar from "./progress_bar/ProgressBar";

import "./App.css";

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState("accordion");
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  };

  const getRandomColor = () => {
    const colors = ["lightblue", "lime", "darkseagreen", "lightgreen", "powderblue", "crimson", "indigo"];
    return colors[getRandomIntInclusive(0, colors.length - 1)];
  }

  const components = {
    accordion: {
      component: Accordion,
      props: {},
    },
    autocomplete: {
      component: AutoComplete,
      props: {},
    },
    progressBar: {
      component: ProgressBar,
      props: {
        displayPercentageNumber: true,
        progressPercentage: getRandomIntInclusive(0, 100),
        defaultColor: getRandomColor(),
      }
    }
  };

  const handleComponentSelect = e => {
    if (e.target && e.target.getAttribute("data-component-name")) {
      setSelectedComponent(e.target.getAttribute("data-component-name"));
    }
  };

  const renderSelectedComponent = () => {
    let Component = components[selectedComponent].component;
    return <Component {...components[selectedComponent].props} />;
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
          <div style={{
            marginTop: "5%",
          }}>
            {renderSelectedComponent()}
          </div>
        </div>
      </Jumbotron>
    </Container>
  );
};

export default App;
