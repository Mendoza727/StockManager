import { LoadingComponent } from '@/components/LoadingComponent';
import { LoginScreen } from '@/screens/Auth/LoginScreen';
import RegisterScreen from '@/screens/Auth/RegisterScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { ProductScreen } from '@/screens/product/ProductScreen';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

export type RootStackParams = {
    LoadingComponent: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: string };
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress
        }
    }
}


export const RouteScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingComponent" component={LoadingComponent} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    );
}