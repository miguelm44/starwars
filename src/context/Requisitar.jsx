import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ItensContext from './itensContext';

function UseProvider({ children }) {
  const [retornoApi, setRetorno] = useState([]);
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
  }, []);

  return (
    <ItensContext.Provider value={ { apiValue: retornoApi } }>
      {children}
    </ItensContext.Provider>
  );
}
UseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UseProvider;
