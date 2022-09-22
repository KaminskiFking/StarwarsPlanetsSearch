import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockResponse from './mock';
import App from '../App';

describe('Verifica Componentes Filter', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
  })
  });

  it('Verifica name-filterr', () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter')
    expect(nameFilter).toBeInTheDocument()
    userEvent.type(nameFilter, 'Alderaan')

  })

  it('Verifica column-filter', () => {
    render(<App />);

    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument()
    userEvent.selectOptions(columnFilter, 'population')

  })

  it('Verifica comparison-filter', () => {
    render(<App />);

    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument()
    userEvent.selectOptions(comparisonFilter, 'igual a')

  })

  it('Verifica value-filter', () => {
    render(<App />);
    const valueFilter = screen.getByTestId('value-filter')
    expect(valueFilter).toBeInTheDocument()
    userEvent.type(valueFilter, '10000')
  })

  it('Verifica button-filter', () => {
    render(<App />);
    const buttonFilter = screen.getByTestId('button-filter')
    expect(buttonFilter).toBeInTheDocument()
    userEvent.click(buttonFilter)

  })

  it('Verifica evento na tela', async () => {
    render(<App />);


      const columnFilter = screen.getByTestId('column-filter')
      expect(columnFilter).toBeInTheDocument()
      userEvent.selectOptions(columnFilter, 'population')

      const comparisonFilter = screen.getByTestId('comparison-filter')
      expect(comparisonFilter).toBeInTheDocument()
      userEvent.selectOptions(comparisonFilter, 'igual a')

      const valueFilter = screen.getByTestId('value-filter')
      expect(valueFilter).toBeInTheDocument()
      userEvent.type(valueFilter, '2000000000')

      const buttonFilter = screen.getByTestId('button-filter')
      expect(buttonFilter).toBeInTheDocument()
      userEvent.click(buttonFilter)

      const resultText = await screen.findByText(/Alderaan/i)
      expect(resultText).toBeInTheDocument()
    })
    
})


