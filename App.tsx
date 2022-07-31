import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/router';

// Create a client
const queryClient = new QueryClient()

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
