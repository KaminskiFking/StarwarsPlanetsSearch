import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../ServicesApi.js/FetchPlanets';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [tablePlanets, setTablePlanets] = useState([]);
  const [filterByNumeric, setFilterByNumeric] = useState([]);

  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    fetchPlanets().then((requestPlanets) => {
      requestPlanets.forEach((informations) => delete informations.residents);
      setTablePlanets([...requestPlanets]);
    });
  }, []);

  const resultsStarWars = {
    planets: tablePlanets,
    filterByNumeric,
    setFilterByNumeric,
    filterName,
    setFilterName,
  };

  return (
    <StarWarsContext.Provider value={ resultsStarWars }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StarWarsProvider, StarWarsContext };
