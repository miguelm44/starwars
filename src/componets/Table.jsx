/*  */
import { useContext, useState } from 'react';
import ItensContext from '../context/itensContext';

function Table() {
  const [valueImput, setValueImput] = useState('');

  const { apiValue } = useContext(ItensContext);
  const filtrar = apiValue
    .filter((e) => e.name.toLowerCase().includes(valueImput.toLowerCase()));
  return (
    <>
      <input
        type="text"
        value={ valueImput }
        data-testid="name-filter"
        onChange={ ({ target }) => setValueImput(target.value) }
      />
      <table border="1">
        <thead>
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
        </thead>
        <tbody>
          {
            filtrar.map((element) => (
              (

                <tr key={ element.name }>
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

              )
            ))
          }
        </tbody>
      </table>
    </>
  );
}
export default Table;
