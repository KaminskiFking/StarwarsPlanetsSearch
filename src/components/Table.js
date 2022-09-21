import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

function Table() {
  const { planets } = useContext(StarWarsContext);
  const [filterByNumeric, setFilterByNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [planetsHandleFilter, setPlanetsHandleFilter] = useState(planets);

  const [filterClickValue, setFilterClickValue] = useState(0);

  const objFilterNumberic = {
    filterByNumericValues: [filterByNumeric],
  };

  const [FilterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => { setPlanetsHandleFilter(planets); }, [planets]);

  const filterByNumber = (valueA, valueB, comparison) => {
    valueA = parseInt(valueA, 10);
    valueB = parseInt(valueB, 10);

    if (comparison === 'maior que') return valueA > valueB;
    if (comparison === 'menor que') return valueA < valueB;
    if (comparison === 'igual a') return valueA === valueB;
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterName({
      filterByName: {
        name: value,
      } });
  };

  const handleClickFilter = (event) => {
    event.preventDefault();
    const { column, comparison, value } = objFilterNumberic.filterByNumericValues[0];
    if (column !== undefined
      && comparison !== undefined && value !== undefined && filterClickValue < 1) {
      const filterPlanets = planets
        .filter((planetNum) => filterByNumber(planetNum[column], value, comparison));
      console.log(filterPlanets);
      setFilterClickValue({ filterClickValue: filterClickValue + 1 });
      return setPlanetsHandleFilter(filterPlanets);
    }
    if (Object.values(filterClickValue)[0] === 1) {
      return setPlanetsHandleFilter((prevFilterSum) => prevFilterSum
        .filter((planetNumber) => filterByNumber(
          planetNumber[column], value, comparison,
        )));
    }
  };

  const handleChangeNumbers = ({ target }) => {
    const { value, name } = target;
    setFilterByNumeric((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const { filterByName } = FilterName;
  const valueNumber = objFilterNumberic.filterByNumericValues.filter((e) => e.value);
  console.log(planetsHandleFilter);
  return (
    <div>
      <form>
        <label htmlFor="filter-name">
          Filtrar:
          <input
            data-testid="name-filter"
            type="text"
            value={ filterByName.name }
            onChange={ handleChange }
            name="filter-name"
            placeholder="planets"
          />
        </label>
      </form>
      <form>
        <select
          onChange={ handleChangeNumbers }
          data-testid="column-filter"
          name="column"
        >
          <option value="population" selected>population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          onChange={ handleChangeNumbers }
          data-testid="comparison-filter"
        >
          <option value="maior que" selected>maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="filter-number">
          Number:
          <input
            data-testid="value-filter"
            defaultValue="0"
            type="number"
            value={ valueNumber[0] && valueNumber[0].value }
            onChange={ handleChangeNumbers }
            name="value"
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filtrar
        </button>
      </form>
      <table>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
        <tbody>
          {planetsHandleFilter && planetsHandleFilter
            .filter((planetFilter) => (planetFilter.name).includes(filterByName.name))
            .map((element, index) => (
              <tr key={ index }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>{element.films}</td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
