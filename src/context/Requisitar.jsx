import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ItensContext from './itensContext';

function UseProvider({ children }) {
  const [retornoApi, setRetorno] = useState([]);/* dev-miguel-ambrosio */
  const [inptNumber, setImputNumber] = useState({ /* state do requisito 3 */
    column: 'population',
    comparison: 'maior que',
    number: '0',
  });
  const [arrayFilter, setArrayFilter] = useState([]);
  const [valueImput, setValueImput] = useState('');
  const [valueFiltro, setFiltro] = useState([]);
  const [remover, setRemover] = useState([]);
  /* const [remove, setRemove] = useState(true);
 */
  useEffect(() => {
    const api = async () => {
      const url = 'https://swapi.dev/api/planets';
      try {
        const requerir = await fetch(url);
        const json = await requerir.json();/* a */
        json.results.forEach((e) => delete e.residents);
        console.log(json.results, '###');
        setRetorno(json.results);
        setRemover(json.results);
      } catch (erro) {
        return erro;
      }
    };
    api();
  }, [valueImput]);

  const RemoverFiltro = () => {
    setRetorno(remover);
  };
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
        RemoverFiltro,
        remover,
        arrayFilter,
        setArrayFilter,
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
