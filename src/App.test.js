import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import App from './App';

import { Login } from './components/auth/Login';
import store from './store';

afterEach(cleanup);

describe('App Render Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Authentication Tests', () => {
  const firebase = {
    login: jest.fn(
      ({ email, password }) => {
        if (email === 'user@example.org' && password === 'correctpassword') return Promise.resolve('OK');
        return Promise.reject(new Error('ERROR'));
      },
    ),
  };

  // Provide Redux store to tested components
  const reduxWrap = Component => (
    <Provider store={store}><Component firebase={firebase} /></Provider>
  );

  it('Submission of Correct Authentication', () => {
    const { getByLabelText, getByTestId } = render(reduxWrap(Login));
    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Password');
    const inputSubmit = getByTestId('submit');
    fireEvent.change(inputEmail, { target: { value: 'user@example.org' } });
    fireEvent.change(inputPassword, { target: { value: 'correctpassword' } });
    fireEvent.click(inputSubmit);
    expect(firebase.login.mock.results[0].value).resolves.toEqual('OK');
  });

  it('Submission of Incorrect Authentication', () => {
    const { getByLabelText, getByTestId } = render(reduxWrap(Login));
    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Password');
    const inputSubmit = getByTestId('submit');
    fireEvent.change(inputEmail, { target: { value: 'user@example.org' } });
    fireEvent.change(inputPassword, { target: { value: 'wrongpassword' } });
    fireEvent.click(inputSubmit);
    expect(firebase.login.mock.results[1].value).rejects
      .toMatchObject({
        message: 'ERROR',
      });
  });
});
