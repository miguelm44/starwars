/*  */
import { useContext, useState } from 'react';
import ItensContext from '../context/itensContext';

function Table() {
  const [option, setOption] = useState(true);
  console.log(option);
  const { retornoApi,
    valueImput,
    setValueImput,
    inptNumber,
    setImputNumber,
    setRetorno,
  } = useContext(ItensContext);

  const filtrar = retornoApi
    .filter((e) => e.name.toLowerCase().includes(valueImput.toLowerCase()));

  /* setFiltro(...filtrar); */
  /* const filterList = [
    {
      input: "Tattoine", // onde vc digita
      select1: "population",
      select2: "maior que",
      valorNumerico: 100
    },
    {
      input: "Tattoine", // onde vc digita
      select1: "population",
      select2: "maior que",
      valorNumerico: 100
    }
  ];
 */
  /* const arrayPlaneta = [];

  filterList.filter((filter) => {
    arrayPlaneta.filter((planet) => {
      if(filter.select2 === "maior que") {

      } else if (filter.select2 === "menor que")
    })
  }) */
  /* const list = [inptNumber];
  list.map((element) => {
    if(element.comparison === "maior que") {
      return filtrar.filter((fil) => fil.column > element)
    }
    if(element.comparison === "menor que")
    if(element.comparison === "igual a")
    return
  })
 */
  const clickButton = () => { /* função requisito 3 */
    const list = [inptNumber];

    list.forEach((element) => {
      const valorFiltrado = retornoApi.filter((fil) => {
        if (element.comparison === 'maior que') {
          return Number(fil[element.column]) > Number(element.number);
        } if (element.comparison === 'menor que') {
          return Number(fil[element.column]) < Number(element.number);
        }
        return Number(fil[element.column]) === Number(element.number);
      });/*  */

      setRetorno(valorFiltrado);
      if (inptNumber.column === 'population') {
        return setOption(false);
      }
    });
  };

  return (
    <>
      <input
        type="text"
        value={ valueImput }
        data-testid="name-filter"
        onChange={ ({ target }) => setValueImput(target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => {
          setImputNumber({ ...inptNumber, column: target.value });
        } }
        value={ inptNumber.column }
      >
        {
          option
            ? <option value="population">population</option>
            : ''
        }

        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ () => clickButton() }
      >
        Filtrar

      </button>
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
