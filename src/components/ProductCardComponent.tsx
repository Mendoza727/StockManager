import { ProductEntity } from '@/domain/entity/ProductEntity'
import React from 'react'
import { Image } from 'react-native';
import { FadeInImage } from './FadeInImage';
import { Card, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '@/routes/RouteScreen';

interface Props {
  product: ProductEntity;
}

export const ProductCardComponent = ({ product }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
      }}
      onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}
    >
      {
        product.images.length === 0 ? (
          <Image
            source={require('@/assets/no-product-image.png')}
            style={{
              width: '100%',
              height: 200,
            }}
          />
        ) : (
          <FadeInImage
            uri={product.images[0]}
            style={{
              width: '100%',
              height: 200,
            }}
          />
        )
      }

      {/* Título del producto */}
      <Text
        numberOfLines={2}
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginVertical: 5,
          color: 'black'
        }}
      >
        {product.title}
      </Text>
    </Card>
  )
}