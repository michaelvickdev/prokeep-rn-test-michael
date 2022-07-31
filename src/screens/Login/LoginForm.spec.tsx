import 'react-native'
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import LoginForm, { TEST_ID_EMAIL_INPUT, TEST_ID_PASSWORD_INPUT, TEST_ID_SUBMIT_BUTTON } from './LoginForm';

const email = "eve.holt@reqres.in";
const password = "cityslicka";

describe('LoginForm', () => {
  it('should validate email', async () => {
    const { queryByText, getByTestId } = render(<LoginForm onSubmit={(v) => {}} />);
    expect(queryByText('Login')).not.toBeNull();

    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    await waitFor(() => {
      fireEvent.changeText(passwordInput, password);
      expect(passwordInput.props.value).toBe(password);
      fireEvent.press(button);
      expect(queryByText('Email is required')).not.toBeNull();
    })

    await waitFor(() => {
      fireEvent.changeText(emailInput, "aaaa");
      expect(emailInput.props.value).toBe("aaaa");
      fireEvent.press(button);
      expect(queryByText('Please enter valid email')).not.toBeNull();
    })
  });

  it('should validate password', async () => {
    const { queryByText, getByTestId } = render(<LoginForm onSubmit={(v) => {}} />);
    expect(queryByText('Login')).not.toBeNull();

    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    await waitFor(() => {
      fireEvent.changeText(emailInput, email);
      expect(emailInput.props.value).toBe(email);
      fireEvent.press(button);
      expect(queryByText('Password is required')).not.toBeNull();
    })

    await waitFor(() => {
      fireEvent.changeText(passwordInput, "1");
      expect(passwordInput.props.value).toBe("1");
      fireEvent.press(button);
      expect(queryByText('Password must be at least 6 characters')).not.toBeNull();
    })

  });

  it('should can submit', async () => {
    let values = {}
    const { queryByText, getByTestId } = render(<LoginForm onSubmit={(v) => {
      values = v;
    }} />);
    expect(queryByText('Login')).not.toBeNull();

    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    await waitFor(() => {
      fireEvent.changeText(emailInput, email);
      expect(emailInput.props.value).toBe(email);

      fireEvent.changeText(passwordInput, password);
      expect(passwordInput.props.value).toBe(password);
      fireEvent.press(button);

      expect(queryByText('Password is required')).toBeNull();
      expect(queryByText('Email is required')).toBeNull();

      expect(values).toStrictEqual({ email, password });
    
    })

  });
});