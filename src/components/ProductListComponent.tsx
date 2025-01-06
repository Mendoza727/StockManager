import { ProductEntity } from '@/domain/entity/ProductEntity'
import { Layout, List, Spinner, Text } from '@ui-kitten/components';
import React, { useState } from 'react'
import { LottieComponent } from './LottieComponent';
import LottieView from 'lottie-react-native';
import { ProductCardComponent } from './ProductCardComponent';
import { RefreshControl } from 'react-native';
import {useQueryClient } from '@tanstack/react-query';

interface Props {
    products: ProductEntity[];
    fetchNextPage: () => void;
    //TODO: fetch mas productos
}


export const ProductListComponent = ({ products, fetchNextPage }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const QueryClient = useQueryClient();

    const onPullToRefresh = async() => {
        setIsRefreshing(true);

        //sleep 2 segundos
        await new Promise(resolve =>  setTimeout(resolve, 2000));

        QueryClient.invalidateQueries({ queryKey: ['products', 'infinite']});

        setIsRefreshing(false);
    }


    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <ProductCardComponent product={item} />
            )}
            ListFooterComponent={(
                <Layout style={{
                    flex: 1,
                    height: 200,
                    marginBottom: 90,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <LottieComponent 
                        animation={require('../lotties/Loading-footer-lottie.json')}
                        style={{
                            width: 200,
                            height: 200
                        }}
                    />
                </Layout>
            )}
            onEndReached={ fetchNextPage }
            onEndReachedThreshold={0.8}
            refreshControl={
                <RefreshControl 
                    refreshing={ isRefreshing }
                    onRefresh={ onPullToRefresh }
                />
            }
        />
    )
}
