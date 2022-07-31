import React from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import LoginForm from './LoginForm';

export default function Login() {
  const { isLoading, mutateAsync } = useMutation<Response, AxiosError, any>((body) => api.post('/api/login', body))
  const { navigate } = useNavigation();

  return (
    <LoginForm
      isLoading={isLoading}
      onSubmit={(values, { setFieldError }) => {
        mutateAsync(values)
          .then(res => {
            navigate("Home" as never);
          })
          .catch(err => {
            const message = err.response?.data?.error || "Failed!";
            setFieldError("password", message);
          })
      }}
    />
  );
}