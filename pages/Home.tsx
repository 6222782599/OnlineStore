import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

import type { HomeScreenNavigationProp } from '../types/navigation-types';

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function ({ navigation }: Props) {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Button
                title="City name mode"
                onPress={() => navigation.navigate('CityName')}
            />
            <View style={styles.space} />
            <Button
                title="Lat-long mode"
                onPress={() => navigation.navigate('LatLong')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
});
