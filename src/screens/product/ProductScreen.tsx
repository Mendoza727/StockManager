import { GetProductById } from '@/actions/products/GetProductById'
import CarouselComponent from '@/components/CarouselComponent'
import { IconComponent } from '@/components/IconComponent'
import { LoadingComponent } from '@/components/LoadingComponent'
import { MainLayout } from '@/layouts/MainLayout'
import { RootStackParams } from '@/routes/RouteScreen'
import { StackScreenProps } from '@react-navigation/stack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { Alert, Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Gender, ProductEntity, Size } from '@/domain/entity/ProductEntity'
import { Formik } from 'formik'
import { UpdateProductById } from '@/actions/products/UpdateProductById'
import { CameraAdapter } from '@/config/adapters/camera-adapter'
import { FloatingActionButtonComponent } from '@/components/FloatingActionButtonComponent'

const sizes: Size[] = [
  Size.L, Size.M, Size.S, Size.XL, Size.XS, Size.XXL
];
const genders: Gender[] = [
  Gender.men, Gender.unisex, Gender.women, Gender.kid
];


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const QueryClient = useQueryClient();

  const [isTagFormVisible, setIsTagFormVisible] = useState(false); // Visibilidad del formulario
  const [newTag, setNewTag] = useState(''); // Estado local para el nuevo tag


  //useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => GetProductById(productIdRef.current),
  });

  //useMutacion
  const mutation = useMutation({
    mutationFn: (data: ProductEntity) => UpdateProductById({ ...data, id: productIdRef.current }),
    onSuccess(data: ProductEntity) {
      productIdRef.current = data.id // creacion 
      QueryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      QueryClient.invalidateQueries({ queryKey: ['product', data.id] });
      Alert.alert('Succes', `Product ${product?.title} has create or update succesfully`);
    }
  })

  if (!product) {
    return (<MainLayout title='cargando...'>
      <LoadingComponent />
    </MainLayout>)
  }


  return (
    <Formik
      initialValues={product}
      onSubmit={mutation.mutate}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <>
            <MainLayout
              title={values.title === '' ? 'Nuevo Producto' : values.title}
              rightAction={async () => {
                Alert.alert(
                  'Seleccionar imagen',
                  '¿Qué deseas hacer?',
                  [
                    {
                      text: 'Tomar Foto',
                      onPress: async () => {
                        const photos = await CameraAdapter.takePicture();
                        setFieldValue('images', [...values.images, ...photos]);
                      },
                    },
                    {
                      text: 'Elegir Foto',
                      onPress: async () => {
                        const photos = await CameraAdapter.getPictureFromLibrary();
                        setFieldValue('images', [...values.images, ...photos]);
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }}
              rigthActionIcon='image-outline'
            >
              <ScrollView style={{
                flex: 1
              }}
                showsVerticalScrollIndicator={false}
              >
                {/* carousel */}
                <Layout>
                  {
                    values.images.length === 0 ? (
                      <Image
                        source={require('../../assets/no-product-image.png')}
                        resizeMode='cover'
                        style={{
                          height: 400,
                          width: '100%'
                        }}
                      />
                    ) : (
                      <CarouselComponent
                        images={values.images}
                      />
                    )
                  }
                </Layout>

                {/* form */}
                <Layout style={{ marginHorizontal: 5, marginTop: 20 }}>
                  <Input
                    label='title'
                    value={values.title}
                    style={{ marginHorizontal: 5 }}
                    size='large'
                    onChangeText={handleChange('title')}
                  />

                  <Input
                    label='description'
                    value={values.description}
                    style={{ marginHorizontal: 5, marginTop: 15 }}
                    multiline
                    size='large'
                    numberOfLines={15}
                    onChangeText={handleChange('description')}
                  />
                </Layout>

                {/* tags */}
                <Layout style={{ marginHorizontal: 10, marginTop: 20 }}>
                  <Text category="label">Tags</Text>
                  <Layout
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    {values.tags.map((tag, index) => (
                      <Layout
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 20,
                          backgroundColor: values.tags.includes(tag) ? theme['color-primary-200'] : undefined,
                        }}
                      >
                        <Text style={{
                          color: 'black'
                        }}>{tag}</Text>
                        <Button
                          appearance="ghost"
                          size="small"
                          style={{ marginLeft: 5 }}
                          onPress={() =>
                            setFieldValue(
                              'tags',
                              values.tags.filter((t) => t !== tag)
                            )
                          }
                          accessoryLeft={() => <IconComponent name="close-outline" />}
                        />
                      </Layout>
                    ))}
                    {/* Botón para mostrar el formulario de agregar tag */}
                    <Button
                      size="small"
                      appearance="outline"
                      style={{
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}
                      onPress={() => setIsTagFormVisible(true)}
                      accessoryLeft={() => <IconComponent name="plus-outline" />}
                    >
                      Add Tag
                    </Button>
                  </Layout>

                  {/* Formulario para agregar nuevo tag */}
                  {isTagFormVisible && (
                    <Layout style={{ marginTop: 10 }}>
                      <Input
                        placeholder="Enter new tag"
                        value={newTag}
                        onChangeText={(text) => setNewTag(text)}
                      />
                      <Button
                        onPress={() => {
                          const trimmedTag = newTag.trim();
                          if (trimmedTag && !values.tags.includes(trimmedTag)) {
                            setFieldValue('tags', [...values.tags, trimmedTag]); // Agrega el nuevo tag
                            setNewTag(''); // Limpia el estado local
                            setIsTagFormVisible(false); // Cierra el formulario
                          }
                        }}
                        size="small"
                        style={{ marginTop: 10 }}
                        status="info"
                      >
                        Save Tag
                      </Button>
                    </Layout>
                  )}
                </Layout>


                {/* price and stock */}
                <Layout style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  marginTop: 20,
                  gap: 10
                }}>
                  <Input
                    label='price'
                    value={values.price.toString()}
                    style={{ flex: 1 }}
                    size='large'
                    keyboardType='numeric'
                    onChangeText={handleChange('price')}
                    accessoryLeft={() => <IconComponent name='pricetags-outline' />}
                  />

                  <Input
                    label='stock'
                    value={values.stock.toString()}
                    style={{ flex: 1 }}
                    size='large'
                    keyboardType='numeric'
                    onChangeText={handleChange('stock')}
                    accessoryLeft={() => <IconComponent name='archive-outline' />}
                  />
                </Layout>

                {/* selectores */}
                <ButtonGroup style={{
                  margin: 2,
                  marginTop: 20,
                  marginHorizontal: 10
                }}
                  size='small'
                  appearance='outline'>
                  {
                    sizes.map(size => (
                      <Button
                        onPress={() => setFieldValue('sizes',
                          values.sizes.includes(size)
                            ? values.sizes.filter(s => s !== size)
                            : [...values.sizes, size]
                        )}
                        key={size}
                        style={{
                          flex: 1,
                          backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
                        }}
                      >{size}</Button>
                    ))
                  }
                </ButtonGroup>

                {/* gender */}
                <ButtonGroup style={{
                  margin: 2,
                  marginTop: 20,
                  marginHorizontal: 10
                }}
                  size='small'
                  appearance='outline'>
                  {
                    genders.map(gender => (
                      <Button
                        key={gender}
                        onPress={() => setFieldValue('gender', gender)}
                        style={{
                          flex: 1,
                          backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined
                        }}
                      >{gender}</Button>
                    ))
                  }
                </ButtonGroup>
                <Layout style={{ height: 250 }} />
              </ScrollView>

            </MainLayout>

            <FloatingActionButtonComponent
              iconName='save-outline'
              onPress={() => handleSubmit()}
              style={{
                position: 'absolute',
                bottom: 30,
                right: 20
              }}
            />
          </>
        )
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});