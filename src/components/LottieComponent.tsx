import { Layout } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import React from 'react'
import { StyleProp, StyleSheet } from 'react-native';

interface Props {
  animation: any;
  style?: StyleProp<any>;
}

export const LottieComponent = ({ animation, style }: Props) => {
  return (
    <Layout style={styles.container}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={style}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});