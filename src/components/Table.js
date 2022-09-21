import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

const spaceOptions = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparationOptions = ['maior que',
  'menor que',
  'igual a',
];

function Table() {
  const { planets,
    filterName,
    setFilterName, setFilterByNumeric, filterByNumeric } = useContext(StarWarsContext);

  const [columnUm, setColumn] = useState(spaceOptions[0]);
  const [valueUm, setValueUm] = useState('0');
  const [comparisonUm, setComparison] = useState(comparationOptions[0]);

  const [excludColumns, setExcludColumns] = useState([]);

  const filterByNumber = (valueA, valueB, comparison) => {
    valueA = parseInt(valueA, 10);
    valueB = parseInt(valueB, 10);

    if (comparison === 'maior que') return valueA > valueB;
    if (comparison === 'menor que') return valueA < valueB;
    if (comparison === 'igual a') return valueA === valueB;
  };

  const handleChange = ({ target }) => {
    setFilterName({
      filterByName: {
        name: target.value,
      } });
  };

  const handClickDecreaseFilter = (value) => {
    setFilterByNumeric((prevState) => prevState.filter((element) => element !== value));
  };

  const handClickRemoveFilter = () => {
    setFilterByNumeric([]);
  };

  const handleClickFilter = async () => {
    setFilterByNumeric((prevState) => [
      ...prevState, { column: columnUm, value: valueUm, comparison: comparisonUm }]);
    setExcludColumns((prevState) => [...prevState, columnUm]);
  };

  useEffect(() => {
    setColumn(spaceOptions
      .filter((element) => !excludColumns.includes(element))[0]);
  }, [excludColumns]);

  const { filterByName } = filterName;
  return (
    <div>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handClickRemoveFilter }
      >
        Remove Filters
      </button>
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
          onChange={ ({ target }) => setColumn(target.value) }
          data-testid="column-filter"
          name="column"
        >
          {spaceOptions.filter((element) => !excludColumns.includes(element))
            .map((elementSpace) => (
              <option key={ elementSpace } value={ elementSpace }>{elementSpace}</option>
            ))}
        </select>
        <select
          name="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
          data-testid="comparison-filter"
        >
          {comparationOptions
            .map((elementComparation) => (
              <option
                key={ elementComparation }
                value={ elementComparation }
              >
                {elementComparation}
              </option>
            ))}
        </select>
        <label htmlFor="filter-number">
          Number:
          <input
            data-testid="value-filter"
            defaultValue="0"
            type="number"
            onChange={ ({ target }) => setValueUm(target.value) }
            name="value"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filtrar
        </button>
      </form>
      {filterByNumeric.map((elementF, index) => (
        <li
          data-testid="filter"
          key={ index }
        >
          { elementF.column }
          <button type="button" onClick={ () => handClickDecreaseFilter(elementF) }>
            X
          </button>
        </li>
      ))}
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
          {filterByNumeric
            .reduce((acc, { column, value, comparison }) => acc
              .filter((planet) => (
                filterByNumber(planet[column], value, comparison))),
            planets)
            .filter((ele) => (ele.name).includes(filterByName.name))
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
