import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TodoTable from './components/TodoTable';
import '@testing-library/jest-dom/extend-expect';
import Todolist from './components/Todolist';
import App from './App';


test('renders Todotable', () => {
  const row = [
    {desc: 'Go to coffee' , date: '24.01.2021'}
  ]
  
  const todotable = render(<TodoTable todos={row} />);
  expect(todotable.container).toHaveTextContent('Go to coffee');
  expect(todotable.container).not.toHaveTextContent('Some text');
});

test('addtodo', () => {
  const { container, getByText, getByPlaceholderText} = render(<Todolist />, <App />);
  const desc = getByPlaceholderText('Description');
  fireEvent.change(desc, { target:{ value:'Go to coffee'} })
  const date = getByPlaceholderText('Date');
  fireEvent.change(date, { target:{ value:'29.01.2021'} })
  const button = getByText('Add');
  fireEvent.click(button);
  expect(container).toHaveTextContent('Go to coffee');
  const button2 = getByText('Clear');
  fireEvent.click(button2);
  expect(container).not.toHaveTextContent('Go to coffee');
});

