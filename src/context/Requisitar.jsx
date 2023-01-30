import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ItensContext from './itensContext';

function UseProvider({ children }) {
  const [retornoApi, setRetorno] = useState([]);
  const [inptNumber, setImputNumber] = useState({ /* state do requisito 3 */
    column: 'population',
    comparison: 'maior que',
    number: '0',
  });
  const [valueImput, setValueImput] = useState('');
  const [valueFiltro, setFiltro] = useState([]);
  useEffect(() => {
    const api = async () => {
      const url = 'https://swapi.dev/api/planets';
      try {
        const requerir = await fetch(url);
        const json = await requerir.json();
        json.results.forEach((e) => delete e.residents);
        setRetorno(json.results);
      } catch (erro) {
        return erro;
      }
    };
    api();
  }, [valueImput]);

  return (
    <ItensContext.Provider
      value={ {
        retornoApi,
        setRetorno,
        valueImput,
        setValueImput,
        inptNumber,
        setImputNumber,
        valueFiltro,
        setFiltro,
      } }
    >

      {children}
    </ItensContext.Provider>
  );
}
UseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UseProvider;
