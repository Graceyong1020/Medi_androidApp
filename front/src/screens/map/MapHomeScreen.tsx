import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import useAuth from '../../hooks/queries/useAuth';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();
  return (
    <SafeAreaView>
      <Text>Map Screen</Text>
      <Button title="Logout" onPress={() => logoutMutation.mutate(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;

