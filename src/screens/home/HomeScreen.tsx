import { GetProductByPage } from '@/actions/products/GetProductsByPage';
import { FloatingActionButtonComponent } from '@/components/FloatingActionButtonComponent';
import { LoadingComponent } from '@/components/LoadingComponent';
import { ProductListComponent } from '@/components/ProductListComponent';
import { MainLayout } from '@/layouts/MainLayout';
import { RootStackParams } from '@/routes/RouteScreen';
import { StackScreenProps } from '@react-navigation/stack';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'

interface Props extends StackScreenProps<RootStackParams>{};

export const HomeScreen = ({ navigation }: Props) => {

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 50 * 50, // 1 hora
    queryFn: async (params) => {
      console.log({ params });
      return await GetProductByPage(params.pageParam)
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  })



  return (
    <>
      <MainLayout
        title='Products'
        subtitle='app manager products'
      >
        {
          isLoading ? (
            <LoadingComponent />
          ) : <ProductListComponent
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        }
      </MainLayout>
      

      <FloatingActionButtonComponent 
      iconName='plus-outline'
      onPress={() => navigation.navigate('ProductScreen', { productId: 'new'})}
      style={{
        position: 'absolute',
        bottom: 30,
        right: 20
      }}/>
    </>
  )
}
