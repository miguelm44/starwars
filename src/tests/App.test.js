
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import UseProvider from '../context/Requisitar';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import arrayApi from './mock';


const spyFetch = jest.spyOn(global, "fetch");

describe('App', () => {
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(arrayApi),
    });
    await act(async () => render(
      < UseProvider>
        <App />
      </ UseProvider>,
    ));
  })
  /* test('renders App component e acha o titulo', async () => {
    const h1Title = screen.getByRole('heading', { name: /Star wars/i });
    expect(h1Title).toBeInTheDocument();
  }); */
  test('renders App component e acha as 13 colunas', async () => {
    const colunas = screen.getAllByRole('columnheader');
    expect(colunas).toHaveLength(13);
  })
  test('renders App component e acha o botão de filtro', async () => {
    const filtrarBtn = screen.getByRole('button', { name: /Filtrar/i });
    expect(filtrarBtn).toBeInTheDocument();
  });

  test('renders App component e acha o botão de ordenação', async () => {
    const filtrarBtn1 = screen.getByRole('button', { name: /Ordenar/i });
    expect(filtrarBtn1).toBeInTheDocument();
  });

  test('renders App component e acha o botão de remover filtros', async () => {
    const filtrarBtn2 = screen.getByRole('button', { name: /Remover todas filtragens/i });
    expect(filtrarBtn2).toBeInTheDocument();
  });

  test('renders App component e verifica se fetch foi chamada', async () => {
    expect(spyFetch).toHaveBeenCalled();
  })

  test('renders App component e verifica se fetch foi chamada com a url correta', async () => {
    expect(spyFetch).toHaveBeenCalledWith('https://swapi.dev/api/planetas/');
  });

  test('Se os planetas estao aparecendo', async () => {
    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.getByText(/Alderaan/i);
    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  })

  test('Se os filtros esta na pagina', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    expect(filtrarBtn).toBeInTheDocument();
    expect(filtrarColuna).toBeInTheDocument();
    expect(filtrarC).toBeInTheDocument();
    expect(filtNumb).toBeInTheDocument();
  });

  test('Se o filtro "maior que" esta funcionando', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'maior que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    expect(planeta).not.toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  })

  test('Se o filtro "menor que" esta funcionando', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    expect(planeta).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
  })

  test('Se o filtro aparece na pagina com o botão', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    const filter = await screen.findByTestId('filter')
    const xBtn = filter.children[1]

    await waitFor(() => {
      expect(filter).toBeInTheDocument()
      expect(xBtn).toBeInTheDocument()
    })
  });

  test('Se o filtro aparece na pagina com o botão', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    expect(planeta).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    const filter = await screen.findByTestId('filter')
    const xBtn = filter.children[1]

    await waitFor(() => {
      expect(filter).toBeInTheDocument()
      expect(xBtn).toBeInTheDocument()
    })

    await waitFor(() => {
      userEvent.click(xBtn)
    })

    await wait (() => {
      expect(filter).not.toBeInTheDocument()
      expect(xBtn).not.toBeInTheDocument()
      expect(planeta).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    })
  });

  test('Se ao digitar o nome do planeta, filtra corretamente', async () => {
    const filterInput = screen.getByTestId('name-filter')
    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.type(filterInput, 'Tatooine')

    expect(planeta).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    userEvent.clear(filterInput)

    await wait(() => {
      expect(planeta).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    })
  })

  test('Se esta sendo ordenado corretamente', async () => {
    const columnSort = screen.getByTestId('column-sort')
    const descRadio = screen.getByTestId('column-sort-input-desc')
    const orderBtn = screen.getByTestId('column-sort-button')
    const planetas = screen.getAllByTestId('planeta-name')

    expect(planetas[0]).toHaveTextContent('Tatooine')
    expect(planetas[1]).toHaveTextContent('Alderaan')

    userEvent.selectOptions(columnSort, 'orbital_period')
    userEvent.click(descRadio)
    userEvent.click(orderBtn)

    await act( async() => {
      const planets2 = screen.getAllByTestId('planeta-name')
      expect(planets2[0]).toHaveTextContent('Alderaan')
      expect(planets2[1]).toHaveTextContent('Tatooine')
    })
  })

  test('Se o select muda o tamanho', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    expect(filtrarColuna).toHaveLength(5)

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    expect(filtrarColuna).toHaveLength(4)

    userEvent.selectOptions(filtrarColuna, 'population')
    userEvent.selectOptions(filtrarC, 'maior que')
    userEvent.type(filtNumb, '100000')
    userEvent.click(filtrarBtn)

    expect(filtrarColuna).toHaveLength(3)

    userEvent.selectOptions(filtrarColuna, 'orbital_period')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '200')
    userEvent.click(filtrarBtn)

    expect(filtrarColuna).toHaveLength(2)

    userEvent.selectOptions(filtrarColuna, 'diameter')
    userEvent.selectOptions(filtrarC, 'maior que')
    userEvent.type(filtNumb, '8000')
    userEvent.click(filtrarBtn)

    expect(filtrarColuna).toHaveLength(1)

    userEvent.selectOptions(filtrarColuna, 'rotation_period')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '30')
    userEvent.click(filtrarBtn)

    expect(filtrarColuna).toHaveLength(0)

    const xBtns = await screen.findAllByRole('button', { name: /x/i })
    expect(xBtns).toHaveLength(5)

    await waitFor(() => {
      userEvent.click(xBtns[0])
      expect(filtrarColuna).toHaveLength(1)
      userEvent.click(xBtns[1])
      expect(filtrarColuna).toHaveLength(2)
      userEvent.click(xBtns[2])
      expect(filtrarColuna).toHaveLength(3)
      userEvent.click(xBtns[3])
      expect(filtrarColuna).toHaveLength(4)
      userEvent.click(xBtns[4])
      expect(filtrarColuna).toHaveLength(5)
    })
  })

  test('Se o qnd o filtro eh deletado, o estado volta', async () => {
    const filtrarBtn = screen.getByTestId('button-filter')
    const filtrarColuna = screen.getByTestId('column-filter')
    const filtrarC = screen.getByTestId('comparison-filter')
    const filtNumb = screen.getByTestId('value-filter')

    const planeta = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planeta).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filtrarColuna, 'surface_water')
    userEvent.selectOptions(filtrarC, 'menor que')
    userEvent.type(filtNumb, '10')
    userEvent.click(filtrarBtn)

    const filter = await screen.findByTestId('filter')
    const xBtn = filter.children[1]

    expect(planeta).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();

    await wait(async () => {
      expect(filter).toBeInTheDocument()
      expect(xBtn).toBeInTheDocument()

      userEvent.click(xBtn)

      expect(planeta).toBeInTheDocument();
      expect(planet2).toBeInTheDocument();
    })
  })
});