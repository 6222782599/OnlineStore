import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    CityName: undefined;
    LatLong: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

export type CityNameScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'CityName'
>;

export type LatLongScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'LatLong'
>;
