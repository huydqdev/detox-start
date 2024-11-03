import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

const DetoxStart = () => {
    const [greeting, setGreeting] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));

    const onButtonPress = (newGreeting) => {
        setGreeting(newGreeting);
        startFadeIn();
    };

    const startFadeIn = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const renderAfterButton = () => (
        <Animated.View style={[styles.centered, { opacity: fadeAnim }]}>
            <Text style={styles.greetingText} accessibilityLabel="greeting_text">
                {greeting}!!!
            </Text>
            <TouchableOpacity
                testID="reset_btn"
                style={[styles.button, styles.resetButton]}
                onPress={() => setGreeting(null)}
            >
                <Text style={styles.buttonText}>Reset Greeting</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            {!greeting ? (
                <>
                    <Text style={styles.title} accessibilityLabel="welcome_text">
                        Welcome to Detox Demo
                    </Text>
                    <TouchableOpacity
                        testID="hello_btn"
                        style={[styles.button, styles.helloButton]}
                        onPress={() => onButtonPress('Hello')}
                    >
                        <Text style={styles.buttonText}>Say Hello</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID="world_btn"
                        style={[styles.button, styles.worldButton]}
                        onPress={() => onButtonPress('World')}
                    >
                        <Text style={styles.buttonText}>Say World</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID="goodbye_btn"
                        style={[styles.button, styles.goodbyeButton]}
                        onPress={() => onButtonPress('Goodbye, World')}
                    >
                        <Text style={styles.buttonText}>Say Goodbye</Text>
                    </TouchableOpacity>
                </>
            ) : (
                renderAfterButton()
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#333',
    },
    greetingText: {
        fontSize: 24,
        color: '#5a5a5a',
        marginBottom: 15,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    helloButton: {
        backgroundColor: '#4caf50',
    },
    worldButton: {
        backgroundColor: '#2196f3',
    },
    goodbyeButton: {
        backgroundColor: '#f44336',
    },
    resetButton: {
        backgroundColor: '#757575',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

AppRegistry.registerComponent('DetoxStart', () => DetoxStart);

export default DetoxStart;
