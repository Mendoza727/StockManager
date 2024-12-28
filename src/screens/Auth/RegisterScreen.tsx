import { IconComponent } from '@/components/IconComponent'
import { LottieComponent } from '@/components/LottieComponent'
import { RootStackParams } from '@/routes/RouteScreen'
import { useAuthStore } from '@/store/useAuthStore'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {};

const RegisterScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();
  const { Register } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const onRegister = async() => {
    if (form.fullName.length === 0 || form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsLoading(true);
    const wasSuccefullyRegister = await Register(
      form.fullName,
      form.email,
      form.password
    );
    setIsLoading(false);

    if (wasSuccefullyRegister) return;

    Alert.alert('Error', "Por favor revisa el formulario he intentalo denuevo");
  }

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
            value={form.fullName}
            onChangeText={(fullName) => setForm({...form, fullName})}
          />

          <Input
            placeholder='Correo electrónico'
            style={{ marginBottom: 18 }}
            keyboardType='email-address'
            accessoryLeft={ <IconComponent name='email-outline' />}
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({...form, email})}
          />

          <Input
            placeholder='Contraseña'
            style={{ marginBottom: 18 }}
            accessoryLeft={ <IconComponent name='lock-outline' />}
            secureTextEntry
            autoCapitalize='none'
            value={form.password}
            onChangeText={(password) => setForm({...form, password})}
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
            onPress={onRegister}
            disabled={isLoading}
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