import { Layout, Text } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LottieComponent } from './LottieComponent';

export const LoadingComponent = () => {
  return (
    <Layout style={styles.container}>
      <LottieComponent
        animation={require('@/lotties/Loading-lottie.json')}
        style={styles.lottieAnimation}
      />
      <Text category='h1' style={styles.text}>Loading...</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    marginTop: 10,
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
});
