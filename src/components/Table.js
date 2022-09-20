import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsProvider';

function Table() {
  const { planets } = useContext(StarWarsContext);

  const [FilterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterName({
      filterByName: {
        name: value,
      } });
  };

  const { filterByName } = FilterName;
  return (
    <div>
      <form>
        <label htmlFor="filter-name">
          Filtrar:
          <input
            data-testid="name-filter"
            type="text"
            value={ FilterName.name }
            onChange={ handleChange }
            name="filter-name"
            placeholder="planets"
          />
        </label>
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
          {planets
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
