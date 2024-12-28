import { IconComponent } from '@/components/IconComponent'
import { LottieComponent } from '@/components/LottieComponent'
import { RootStackParams } from '@/routes/RouteScreen'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {};

const RegisterScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{
        marginHorizontal: 40,
      }}
        showsVerticalScrollIndicator={false}
      >
        <Layout style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: height * 0.05,
          marginBottom: -20
        }}>
          <LottieComponent
            animation={require('../../lotties/Register-lottie.json')}
            style={{
              width: 300,
              height: 300,
            }}
          />
        </Layout>

        <Layout style={{
          paddingVertical: 10,
        }}>
          <Text category='h1'>Registrate</Text>
          <Text category='s1'>Crea una cuenta, para continuar</Text>
        </Layout>

        {/* form */}
        <Layout style={{
          marginTop: 20,
        }}>
          <Input
            placeholder='Nombre completo'
            style={{ marginBottom: 18 }}
            accessoryLeft={ <IconComponent name='person-outline' />}
          />

          <Input
            placeholder='Correo electrónico'
            style={{ marginBottom: 18 }}
            keyboardType='email-address'
            accessoryLeft={ <IconComponent name='email-outline' />}
            autoCapitalize='none'
          />

          <Input
            placeholder='Contraseña'
            style={{ marginBottom: 18 }}
            accessoryLeft={ <IconComponent name='lock-outline' />}
            secureTextEntry
            autoCapitalize='none'
          />
        </Layout>

        {/* space */}
        <Layout style={{
          height: 5,
        }} />

        {/* button login */}
        <Layout>
          <Button
            accessoryRight={<IconComponent name='person-add-outline' white />}
            onPress={() => console.log('Ingresar')}
          >
            Registrar
          </Button>
        </Layout>

        {/* not loggin register */}
        <Layout style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
          <Text category='s1'>¿Ya tienes cuenta?</Text>
          <Text 
            category='s1' 
            style={{ color: '#007bff' }}
            onPress={() => navigation.goBack() }
          > Ingresa</Text>

        </Layout>
      </ScrollView>
    </Layout>
  )
}

export default RegisterScreen;