import { RootStackParams } from '@/routes/RouteScreen';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsWithChildren, useEffect } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { CheckStatus, status } = useAuthStore();


    useEffect(() => {
        CheckStatus();
    }, []);

    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'authenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }]
            })
        }
    }, [status]);

    return (
        <>{children}</>
    )
}
