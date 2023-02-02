/*  */

import { useContext, useState } from 'react';
import ItensContext from '../context/itensContext';
import Ordernar from './Ordenar';

const initialSelect = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
function Table() {
  const [selects, setSelects] = useState(initialSelect);

  const { retornoApi,
    valueImput,
    setValueImput,
    inptNumber,
    setImputNumber,
    setRetorno,
    RemoverFiltro,
    arrayFilter,
    setArrayFilter,
    remover,
  } = useContext(ItensContext);
  console.log(retornoApi);
  const clickButton = (elemento) => { /* função requisito 3 */
    setArrayFilter([...arrayFilter, inptNumber]);
    const arrayToFilter = [...arrayFilter, inptNumber];
    arrayToFilter.forEach((element) => {
      const valorFiltrado = elemento.filter((fil) => {
        if (element.comparison === 'maior que') {
          return Number(fil[element.column]) > Number(element.number);
        } if (element.comparison === 'menor que') {
          return Number(fil[element.column]) < Number(element.number);
        }
        return Number(fil[element.column]) === Number(element.number);
      });/*  */

      return setRetorno(valorFiltrado);
    });
    const updateSelects = selects.filter((e) => e !== inptNumber.column);
    setSelects(updateSelects);
    setImputNumber({ ...inptNumber, column: updateSelects[0] });
  };

  const removerUnidade = (element) => {
    const removerColun = arrayFilter.filter((retirar) => retirar.column !== element);

    setArrayFilter(removerColun);
    if (removerColun.length === 0) {
      setRetorno(remover);
    } else {
      removerColun.forEach((elemento) => {
        const valorFiltrado = remover.filter((fil) => {
          if (elemento.comparison === 'maior que') {
            return Number(fil[elemento.column]) > Number(elemento.number);
          } if (elemento.comparison === 'menor que') {
            return Number(fil[elemento.column]) < Number(elemento.number);
          }
          return Number(fil[elemento.column]) === Number(elemento.number);
        });

        return setRetorno(valorFiltrado);
      });
    }
  };
  return (
    <>
      <input
        type="text"
        value={ valueImput }
        data-testid="name-filter"
        onChange={ ({ target }) => setValueImput(target.value) }
        placeholder="digite o nome de um planeta"
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => {
          setImputNumber({ ...inptNumber, column: target.value });
        } }
        value={ inptNumber.column }
      >
        {
          selects.map((e) => (
            <option key={ e } value={ e }>{e}</option>
          ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        value={ inptNumber.comparison }
        onChange={ ({ target }) => {
          setImputNumber({
            ...inptNumber, comparison: target.value });
        } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ inptNumber.number }
        onChange={ ({ target }) => {
          setImputNumber({ ...inptNumber, number: target.value });
        } }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => clickButton(retornoApi) }
      >
        Filtrar

      </button>
      {
        arrayFilter.map((filters) => (
          <div key={ filters.column } data-testid="filter">
            <span>
              {`${filters.column} ${filters.comparison} ${filters.number} `}
            </span>
            <button
              type="button"
              name={ filters.column }
              onClick={ () => removerUnidade(filters.column) }
            >
              Delete
            </button>
          </div>
        ))
      }
      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          RemoverFiltro();
          setArrayFilter([]);
          setSelects([...initialSelect]);
        } }
      >
        Remover
      </button>
      <Ordernar />
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
            retornoApi.filter((e) => e.name.toLowerCase()
              .includes(valueImput.toLowerCase()))
              .map((element) => (
                (

                  <tr key={ element.name }>
                    <td data-testid="planet-name">{element.name}</td>

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
