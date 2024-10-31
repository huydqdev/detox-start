import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const DetoxStart = () => {
    const [greeting, setGreeting] = useState();

    const renderAfterButton = () => {
        return (
            <View style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25}}>
                    {greeting}!!!
                </Text>
            </View>
        );
    };

    const onButtonPress = (newGreeting) => {
        setGreeting(newGreeting);
    };

    if (greeting) return renderAfterButton();

    return (
        <View>
            <Text style={{fontSize: 25, marginBottom: 30}}>
                Welcome
            </Text>
            <TouchableOpacity testID='hello_btn' onPress={() => onButtonPress('Hello')}>
                <Text>Say Hello The Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity testID='world_btn' onPress={() => onButtonPress('World')}>
                <Text>Demo Automation for The Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity testID='goodbye_btn' onPress={() => onButtonPress('Goodbye, World')}>
                <Text>Say Goodbye The Coach</Text>
            </TouchableOpacity>
        </View>
    );
};

AppRegistry.registerComponent('DetoxStart', () => DetoxStart);

export default DetoxStart;
