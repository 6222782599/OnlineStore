import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import CityName from './pages/CityName';
import LatLong from './pages/LatLong';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CityName" component={CityName} />
                <Stack.Screen name="LatLong" component={LatLong} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
