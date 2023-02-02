import { useContext, useState } from 'react';
import ItensContext from '../context/itensContext';

function Ordernar() {
  const [state, setState] = useState({ order: { column: 'population', sort: 'ASC' } });

  const initialSelect = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const { retornoApi, setRetorno } = useContext(ItensContext);

  const retirarUnknown = retornoApi.filter((e) => e.population !== 'unknown');
  const unknown = retornoApi.filter((e) => e.population === 'unknown');

  const ordenarColunas = () => {
    if (state.order.sort === 'ASC' && state.order.column === 'population') {
      const newReturnApi = retirarUnknown
        .sort((a, b) => a[state.order.column] - b[state.order.column]);
      setRetorno([...newReturnApi, ...unknown]);
    } else if (state.order.sort === 'DESC' && state.order.column === 'population') {
      const newRetorno = retirarUnknown
        .sort((a, b) => b[state.order.column] - a[state.order.column]);
      setRetorno([...newRetorno, ...unknown]);
    } else if (state.order.sort === 'ASC' && state.order.column !== 'population') {
      const newReturnApi = retornoApi
        .sort((a, b) => a[state.order.column] - b[state.order.column]);
      setRetorno([...newReturnApi]);
    } else if (state.order.sort === 'DESC' && state.order.column !== 'population') {
      const newRetorno = retornoApi
        .sort((a, b) => b[state.order.column] - a[state.order.column]);

      setRetorno([...newRetorno]);
    }
  };
  return (
    <div>

      <select
        id="select"
        data-testid="column-sort"
        value={ state.order.column }
        onChange={
          ({
            target,
          }) => setState((estadoAnterior) => (
            { order: { ...estadoAnterior.order, column: target.value } }))
        }
      >
        {
          initialSelect.map((element) => (
            <option value={ element } key={ element }>{element}</option>
          ))
        }

      </select>
      <label htmlFor="ASC">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="ASC"
          name="radio"
          onChange={ ({ target }) => setState((estadoAnterior) => (
            { order: { ...estadoAnterior.order, sort: target.value } })) }
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          id="DESC"
          name="radio"
          onChange={ ({ target }) => setState((estadoAnterior) => (
            { order: { ...estadoAnterior.order, sort: target.value } })) }
        />

        Descendente
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ ordenarColunas }
      >
        Ordernar

      </button>
    </div>
  );
}
export default Ordernar;
