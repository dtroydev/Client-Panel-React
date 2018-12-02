import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import App from './App';
import { Login } from './components/auth/Login';
import store from './store';

afterEach(cleanup);

// let firebaseMock;
// const withFirebaseMock = (Component) => {
//   firebaseMock = {
//     login: jest.fn(
//       ({ email, password }) => {
//         if (email === 'user@example.org' && password === 'correctpassword') {
//           return Promise.resolve('OK');
//         }
//         return Promise.reject(new Error('ERROR'));
//       },
//     ),
//   };
//   return <Component firebase={firebaseMock} />;
// };

let firebaseSpy;
const withFirebaseSpy = (Component) => {
  const withProvider = Wrapped => props => (
    <Provider store={store}>
      <Wrapped {...props} />
    </Provider>);

  const withFirebaseSpyWrapper = Wrapped => (props) => {
    firebaseSpy = sinon.spy(props.firebase, 'login');
    return <Wrapped {...props} />;
  };

  const Packed = compose(withProvider, withFirebase, withFirebaseSpyWrapper)(Component);
  return <Packed />;
};

describe('App Render Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Authentication Tests', () => {
  it('Submission of Correct Authentication', () => {
    // const { getByLabelText, getByTestId } = render(withFirebaseMock(Login));
    const { getByLabelText, getByTestId } = render(withFirebaseSpy(Login));
    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Password');
    const inputSubmit = getByTestId('submit');
    fireEvent.change(inputEmail, { target: { value: 'user@example.org' } });
    fireEvent.change(inputPassword, { target: { value: 'correctpassword' } });
    fireEvent.click(inputSubmit);
    expect(firebaseSpy.args).toEqual([[{ email: 'user@example.org', password: 'correctpassword' }]]);
    expect(firebaseSpy.calledOnce).toBe(true);
    firebaseSpy.restore();
  });
});
