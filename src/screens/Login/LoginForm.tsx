import React from 'react';
import { Button, View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Field, Formik, FormikHelpers, FormikValues } from 'formik';
import * as yup from 'yup'
import Input from '../../components/Input';


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
})

interface LoginFormProps<Values> {
  isLoading?: boolean;
  onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<Values>) => void
}

interface LoginValues {
  email: string;
  password: string;
}

export const TEST_ID_EMAIL_INPUT = "email"
export const TEST_ID_PASSWORD_INPUT = "password"
export const TEST_ID_SUBMIT_BUTTON = "submit"

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps<LoginValues>) {
  return (
    <Formik
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
      initialValues={{ email: '', password: '' }}
    >
      {({ handleSubmit }) => (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.gap} />
            <Field
              component={Input}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              testID={TEST_ID_EMAIL_INPUT}
            />
            <View style={styles.gap} />
            <Field
              component={Input}
              name="password"
              placeholder="Password"
              secureTextEntry
              testID={TEST_ID_PASSWORD_INPUT}
            />
            <View style={styles.gap} />
            <Button
              disabled={isLoading}
              onPress={() => handleSubmit()} title="Submit"
              testID={TEST_ID_SUBMIT_BUTTON}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
  },
  form: {
    marginTop: 50
  },
  gap: {
    marginBottom: 12
  }
})