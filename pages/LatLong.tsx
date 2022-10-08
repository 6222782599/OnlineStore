import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';

import type { LatLongScreenNavigationProp } from '../types/navigation-types';

import * as Location from 'expo-location';

import {
    BarChart,
    AreaChart,
    XAxis,
    YAxis,
    Grid,
} from 'react-native-svg-charts';
import * as scale from 'd3-scale';

import {
    ResultsProp,
    LocationProp,
    ResponseProp,
} from '../types/results-types';

import GetAPI from '../functions/api';

export default function ({ navigation }: Props) {
    const [results, setResults] = useState<any>(defaultArr.results);

    const [location, setLocation] = useState<LocationProp>({
        lat: 13.78,
        lon: 100.57,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            });
            updateChart();
        })();
    }, []);

    const updateChart = () => {
        // console.log(location);
        const { lat, lon } = location;

        GetAPI({
            uri: 'lat-long',
            params: { lat, lon, frequency: '3hours' },
        })
            .then((resp) => {
                // console.log(resp);

               // let slicedResponse = resp.results;
               // slicedResponse.weather = slicedResponse.weather.slice(0, 8);
                setResults(resp);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 9, flexDirection: 'row' }}>
                <View style={{ flex: 1, width: 50 }}>
                    <YAxis
                        data={results.weather}
                        yAccessor={({ item }) => item.temperature.temp}
                        style={{ flex: 1 }}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        min={20}
                        max={40}
                        contentInset={{ top: 30, bottom: 10 }}
                    />
                </View>
                <View style={{ flex: 9, width: 50, flexDirection: 'column' }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={results.weather}
                        yAccessor={({ item }) => item.temperature.temp}
                        xAccessor={({ item }) =>
                            new Date(item.timeStamp.replace(' ', 'T')).getTime()
                        }
                        xScale={scale.scaleTime}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                        gridMin={20}
                        gridMax={40}
                    >
                        <Grid />
                    </BarChart>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 9 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {results.weather.map((weather, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        key={index}
                                        style={{ height: 40, width: 40 }}
                                        source={{
                                            uri: weather.icon,
                                        }}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>{'Current location: ' + JSON.stringify(location)}</Text>
                <Text>
                    {'Timestamp: ' +
                        results.weather[0].timeStamp +
                        ' to ' +
                        results.weather[results.weather.length - 1].timeStamp}
                </Text>
            </View>
        </View>
    );
}

type Props = {
    navigation: LatLongScreenNavigationProp;
};

const styles = StyleSheet.create({
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
});

const defaultArr = {
    errorMessage: null,
    results: {
        locationName: 'Din Daeng, Bangkok',
        weather: [
            {
                timeStamp: '2022-03-03 04:00:00',
                temperature: {
                    temp: 28.68,
                    temp_min: 27.67,
                    temp_max: 28.68,
                },
                pressure: 1011,
                seaLevel: 1011,
                description: 'few clouds',
                humidity: 62,
                icon: 'http://openweathermap.org/img/w/02n.png',
                wind: {
                    speed: 2.69,
                    deg: 195,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 07:00:00',
                temperature: {
                    temp: 28.13,
                    temp_min: 27.61,
                    temp_max: 28.13,
                },
                pressure: 1011,
                seaLevel: 1011,
                description: 'clear sky',
                humidity: 69,
                icon: 'http://openweathermap.org/img/w/01d.png',
                wind: {
                    speed: 1.32,
                    deg: 227,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 10:00:00',
                temperature: {
                    temp: 32.14,
                    temp_min: 32.14,
                    temp_max: 32.14,
                },
                pressure: 1013,
                seaLevel: 1013,
                description: 'broken clouds',
                humidity: 52,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 1.82,
                    deg: 176,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 13:00:00',
                temperature: {
                    temp: 35.23,
                    temp_min: 35.23,
                    temp_max: 35.23,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'scattered clouds',
                humidity: 41,
                icon: 'http://openweathermap.org/img/w/03d.png',
                wind: {
                    speed: 3.45,
                    deg: 194,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 16:00:00',
                temperature: {
                    temp: 35,
                    temp_min: 35,
                    temp_max: 35,
                },
                pressure: 1006,
                seaLevel: 1006,
                description: 'scattered clouds',
                humidity: 42,
                icon: 'http://openweathermap.org/img/w/03d.png',
                wind: {
                    speed: 6.26,
                    deg: 195,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 19:00:00',
                temperature: {
                    temp: 30.04,
                    temp_min: 30.04,
                    temp_max: 30.04,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'scattered clouds',
                humidity: 63,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 6.13,
                    deg: 190,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-03 22:00:00',
                temperature: {
                    temp: 29.43,
                    temp_min: 29.43,
                    temp_max: 29.43,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'clear sky',
                humidity: 66,
                icon: 'http://openweathermap.org/img/w/01n.png',
                wind: {
                    speed: 5.52,
                    deg: 196,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 01:00:00',
                temperature: {
                    temp: 28.63,
                    temp_min: 28.63,
                    temp_max: 28.63,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'few clouds',
                humidity: 70,
                icon: 'http://openweathermap.org/img/w/02n.png',
                wind: {
                    speed: 3.93,
                    deg: 194,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 04:00:00',
                temperature: {
                    temp: 28.02,
                    temp_min: 28.02,
                    temp_max: 28.02,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'few clouds',
                humidity: 73,
                icon: 'http://openweathermap.org/img/w/02n.png',
                wind: {
                    speed: 3.17,
                    deg: 168,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 07:00:00',
                temperature: {
                    temp: 27.95,
                    temp_min: 27.95,
                    temp_max: 27.95,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'few clouds',
                humidity: 76,
                icon: 'http://openweathermap.org/img/w/02d.png',
                wind: {
                    speed: 2.34,
                    deg: 180,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 10:00:00',
                temperature: {
                    temp: 30.73,
                    temp_min: 30.73,
                    temp_max: 30.73,
                },
                pressure: 1012,
                seaLevel: 1012,
                description: 'broken clouds',
                humidity: 61,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 3.19,
                    deg: 169,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 13:00:00',
                temperature: {
                    temp: 34.85,
                    temp_min: 34.85,
                    temp_max: 34.85,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'scattered clouds',
                humidity: 45,
                icon: 'http://openweathermap.org/img/w/03d.png',
                wind: {
                    speed: 3.75,
                    deg: 172,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 16:00:00',
                temperature: {
                    temp: 35.05,
                    temp_min: 35.05,
                    temp_max: 35.05,
                },
                pressure: 1005,
                seaLevel: 1005,
                description: 'few clouds',
                humidity: 43,
                icon: 'http://openweathermap.org/img/w/02d.png',
                wind: {
                    speed: 4.93,
                    deg: 191,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 19:00:00',
                temperature: {
                    temp: 30.02,
                    temp_min: 30.02,
                    temp_max: 30.02,
                },
                pressure: 1006,
                seaLevel: 1006,
                description: 'scattered clouds',
                humidity: 66,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 6.01,
                    deg: 186,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-04 22:00:00',
                temperature: {
                    temp: 29.08,
                    temp_min: 29.08,
                    temp_max: 29.08,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'overcast clouds',
                humidity: 74,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 6.97,
                    deg: 186,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 01:00:00',
                temperature: {
                    temp: 28.37,
                    temp_min: 28.37,
                    temp_max: 28.37,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'broken clouds',
                humidity: 77,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 5.51,
                    deg: 182,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 04:00:00',
                temperature: {
                    temp: 28.06,
                    temp_min: 28.06,
                    temp_max: 28.06,
                },
                pressure: 1007,
                seaLevel: 1007,
                description: 'broken clouds',
                humidity: 77,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 3.81,
                    deg: 186,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 07:00:00',
                temperature: {
                    temp: 28.05,
                    temp_min: 28.05,
                    temp_max: 28.05,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'broken clouds',
                humidity: 78,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 3.65,
                    deg: 170,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 10:00:00',
                temperature: {
                    temp: 31.55,
                    temp_min: 31.55,
                    temp_max: 31.55,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'overcast clouds',
                humidity: 59,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 4.33,
                    deg: 176,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 13:00:00',
                temperature: {
                    temp: 33.72,
                    temp_min: 33.72,
                    temp_max: 33.72,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'overcast clouds',
                humidity: 49,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.33,
                    deg: 183,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 16:00:00',
                temperature: {
                    temp: 33.31,
                    temp_min: 33.31,
                    temp_max: 33.31,
                },
                pressure: 1005,
                seaLevel: 1005,
                description: 'overcast clouds',
                humidity: 49,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.84,
                    deg: 187,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 19:00:00',
                temperature: {
                    temp: 29.81,
                    temp_min: 29.81,
                    temp_max: 29.81,
                },
                pressure: 1007,
                seaLevel: 1007,
                description: 'overcast clouds',
                humidity: 64,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 5.92,
                    deg: 181,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-05 22:00:00',
                temperature: {
                    temp: 28.88,
                    temp_min: 28.88,
                    temp_max: 28.88,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'scattered clouds',
                humidity: 71,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 5.59,
                    deg: 166,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 01:00:00',
                temperature: {
                    temp: 28.1,
                    temp_min: 28.1,
                    temp_max: 28.1,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'scattered clouds',
                humidity: 78,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 5.49,
                    deg: 182,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 04:00:00',
                temperature: {
                    temp: 27.91,
                    temp_min: 27.91,
                    temp_max: 27.91,
                },
                pressure: 1007,
                seaLevel: 1007,
                description: 'broken clouds',
                humidity: 78,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 4.72,
                    deg: 185,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 07:00:00',
                temperature: {
                    temp: 27.93,
                    temp_min: 27.93,
                    temp_max: 27.93,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'broken clouds',
                humidity: 79,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 4.02,
                    deg: 177,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 10:00:00',
                temperature: {
                    temp: 31.64,
                    temp_min: 31.64,
                    temp_max: 31.64,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'overcast clouds',
                humidity: 59,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.12,
                    deg: 181,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 13:00:00',
                temperature: {
                    temp: 33.62,
                    temp_min: 33.62,
                    temp_max: 33.62,
                },
                pressure: 1008,
                seaLevel: 1008,
                description: 'overcast clouds',
                humidity: 48,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 6.48,
                    deg: 183,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 16:00:00',
                temperature: {
                    temp: 33.03,
                    temp_min: 33.03,
                    temp_max: 33.03,
                },
                pressure: 1006,
                seaLevel: 1006,
                description: 'overcast clouds',
                humidity: 48,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.87,
                    deg: 180,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 19:00:00',
                temperature: {
                    temp: 29.94,
                    temp_min: 29.94,
                    temp_max: 29.94,
                },
                pressure: 1007,
                seaLevel: 1007,
                description: 'overcast clouds',
                humidity: 62,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 5.74,
                    deg: 184,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-06 22:00:00',
                temperature: {
                    temp: 28.73,
                    temp_min: 28.73,
                    temp_max: 28.73,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'scattered clouds',
                humidity: 73,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 6.6,
                    deg: 179,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 01:00:00',
                temperature: {
                    temp: 28.18,
                    temp_min: 28.18,
                    temp_max: 28.18,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'scattered clouds',
                humidity: 78,
                icon: 'http://openweathermap.org/img/w/03n.png',
                wind: {
                    speed: 5.22,
                    deg: 185,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 04:00:00',
                temperature: {
                    temp: 27.85,
                    temp_min: 27.85,
                    temp_max: 27.85,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'overcast clouds',
                humidity: 77,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 4.03,
                    deg: 189,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 07:00:00',
                temperature: {
                    temp: 27.77,
                    temp_min: 27.77,
                    temp_max: 27.77,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'light rain',
                humidity: 78,
                icon: 'http://openweathermap.org/img/w/10d.png',
                wind: {
                    speed: 2.96,
                    deg: 182,
                },
                rain: 0.27,
            },
            {
                timeStamp: '2022-03-07 10:00:00',
                temperature: {
                    temp: 31.59,
                    temp_min: 31.59,
                    temp_max: 31.59,
                },
                pressure: 1011,
                seaLevel: 1011,
                description: 'overcast clouds',
                humidity: 55,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.17,
                    deg: 183,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 13:00:00',
                temperature: {
                    temp: 32.86,
                    temp_min: 32.86,
                    temp_max: 32.86,
                },
                pressure: 1009,
                seaLevel: 1009,
                description: 'overcast clouds',
                humidity: 51,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 5.22,
                    deg: 174,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 16:00:00',
                temperature: {
                    temp: 32.73,
                    temp_min: 32.73,
                    temp_max: 32.73,
                },
                pressure: 1006,
                seaLevel: 1006,
                description: 'overcast clouds',
                humidity: 50,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 4.85,
                    deg: 189,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 19:00:00',
                temperature: {
                    temp: 29.42,
                    temp_min: 29.42,
                    temp_max: 29.42,
                },
                pressure: 1007,
                seaLevel: 1007,
                description: 'overcast clouds',
                humidity: 67,
                icon: 'http://openweathermap.org/img/w/04n.png',
                wind: {
                    speed: 6.37,
                    deg: 199,
                },
                rain: null,
            },
            {
                timeStamp: '2022-03-07 22:00:00',
                temperature: {
                    temp: 28.64,
                    temp_min: 28.64,
                    temp_max: 28.64,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'light rain',
                humidity: 73,
                icon: 'http://openweathermap.org/img/w/10n.png',
                wind: {
                    speed: 4.06,
                    deg: 181,
                },
                rain: 0.7,
            },
            {
                timeStamp: '2022-03-08 01:00:00',
                temperature: {
                    temp: 25.56,
                    temp_min: 25.56,
                    temp_max: 25.56,
                },
                pressure: 1010,
                seaLevel: 1010,
                description: 'moderate rain',
                humidity: 81,
                icon: 'http://openweathermap.org/img/w/10n.png',
                wind: {
                    speed: 4.56,
                    deg: 104,
                },
                rain: 3.4,
            },
        ],
    },
};
