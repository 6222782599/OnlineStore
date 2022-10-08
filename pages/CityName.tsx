import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import type { CityNameScreenNavigationProp } from '../types/navigation-types';

import * as scale from 'd3-scale';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';

import { ResultsProp } from '../types/results-types';

import GetAPI from '../functions/api';

export default function ({ navigation }: Props) {
    const [results, setResults] = useState<ResultsProp>(defaultArr.results);

    const [location, setLocation] = useState('BKK');

    useEffect(() => {
        updateChart();
    }, [location]);

    const updateChart = () => {
        //console.log(location);
        let lat, lon;

        if (location == 'BKK') {
            lat = 13.78;
            lon = 100.57;
        } else if (location == 'CNX') {
            lat = 18.796143;
            lon = 98.979263;
        }

        GetAPI({
            uri: 'cityname',
            params: { name: location },
        })
            .then((resp) => {
                console.log(resp);
                //setResults(resp.results);
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
                        svg={{ fill: 'rgba(181, 255, 98, 0.5)' }}
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
                <Text>{'Current location: ' + location}</Text>
                <Text>
                    {'Timestamp: ' +
                        results.weather[0].timeStamp +
                        ' to ' +
                        results.weather[results.weather.length - 1].timeStamp}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="BKK"
                        onPress={() => {
                            setLocation('BKK');
                        }}
                        disabled={location == 'BKK'}
                    />
                    <View style={styles.space} />
                    <Button
                        title="CNX"
                        onPress={() => {
                            setLocation('CNX');
                        }}
                        disabled={location == 'CNX'}
                    />
                </View>
            </View>
        </View>
    );
}

type Props = {
    navigation: CityNameScreenNavigationProp;
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
                timeStamp: '2022-03-02 12:00:00',
                temperature: {
                    temp: 34.45,
                    temp_min: 27.52,
                    temp_max: 34.45,
                },
                pressure: 1011,
                seaLevel: null,
                description: 'light rain',
                humidity: 40,
                icon: 'http://openweathermap.org/img/w/10d.png',
                wind: {
                    speed: 5.16,
                    deg: 191,
                },
                rain: 0.81,
            },
            {
                timeStamp: '2022-03-03 12:00:00',
                temperature: {
                    temp: 34.14,
                    temp_min: 27.39,
                    temp_max: 34.47,
                },
                pressure: 1011,
                seaLevel: null,
                description: 'sky is clear',
                humidity: 45,
                icon: 'http://openweathermap.org/img/w/01d.png',
                wind: {
                    speed: 5.89,
                    deg: 184,
                },
                rain: 0,
            },
            {
                timeStamp: '2022-03-04 12:00:00',
                temperature: {
                    temp: 35.11,
                    temp_min: 27.87,
                    temp_max: 35.71,
                },
                pressure: 1010,
                seaLevel: null,
                description: 'few clouds',
                humidity: 45,
                icon: 'http://openweathermap.org/img/w/02d.png',
                wind: {
                    speed: 6.77,
                    deg: 186,
                },
                rain: 0,
            },
            {
                timeStamp: '2022-03-05 12:00:00',
                temperature: {
                    temp: 34.5,
                    temp_min: 28.03,
                    temp_max: 34.5,
                },
                pressure: 1008,
                seaLevel: null,
                description: 'broken clouds',
                humidity: 46,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 7.06,
                    deg: 181,
                },
                rain: 0,
            },
            {
                timeStamp: '2022-03-06 12:00:00',
                temperature: {
                    temp: 33.64,
                    temp_min: 27.84,
                    temp_max: 33.64,
                },
                pressure: 1008,
                seaLevel: null,
                description: 'broken clouds',
                humidity: 47,
                icon: 'http://openweathermap.org/img/w/04d.png',
                wind: {
                    speed: 6.6,
                    deg: 184,
                },
                rain: 0,
            },
            {
                timeStamp: '2022-03-07 12:00:00',
                temperature: {
                    temp: 33.62,
                    temp_min: 27.86,
                    temp_max: 33.62,
                },
                pressure: 1009,
                seaLevel: null,
                description: 'light rain',
                humidity: 48,
                icon: 'http://openweathermap.org/img/w/10d.png',
                wind: {
                    speed: 5.46,
                    deg: 183,
                },
                rain: 1.55,
            },
            {
                timeStamp: '2022-03-08 12:00:00',
                temperature: {
                    temp: 26.11,
                    temp_min: 23.8,
                    temp_max: 26.72,
                },
                pressure: 1011,
                seaLevel: null,
                description: 'moderate rain',
                humidity: 75,
                icon: 'http://openweathermap.org/img/w/10d.png',
                wind: {
                    speed: 8.3,
                    deg: 88,
                },
                rain: 14.17,
            },
        ],
    },
};