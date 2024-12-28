import 'react-native-gesture-handler';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { RouteScreen } from '@/routes/RouteScreen';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from '@/providers/AuthProvider';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = (colorScheme === 'dark')
    ? theme['color-basic-800']
    : theme['color-basic-100'];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
            fonts: {
              ...eva.light.fonts,
              ...eva.dark.fonts,
            }
          }}
        >
          <AuthProvider>
            <RouteScreen />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
