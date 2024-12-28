
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'

export const HomeScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1' style={{ textAlign: 'center' }}>Home Screen</Text>

      <Button
        accessoryLeft={ <Icon name='log-out-outline' /> }
      >Cerrar Sesíon</Button>
    </Layout>
  )
}
