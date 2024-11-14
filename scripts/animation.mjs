import React, { useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator,
    useColorScheme
} from 'react-native';

const DetoxStart = () => {
    const [greeting, setGreeting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bounceAnim] = useState(new Animated.Value(1));
    const [rotateAnim] = useState(new Animated.Value(0));
    const colorScheme = useColorScheme();

    const onButtonPress = (newGreeting) => {
        setLoading(true);
        setTimeout(() => {
            setGreeting(newGreeting);
            setLoading(false);
            startRotate();
        }, 1000);
    };

    const debouncedOnButtonPress = debounce(onButtonPress, 500);

    const startBounce = () => {
        bounceAnim.setValue(1);
        Animated.spring(bounceAnim, {
            toValue: 1.1,
            friction: 3,
            useNativeDriver: true,
        }).start(() => bounceAnim.setValue(1));
    };

    const startRotate = () => {
        rotateAnim.setValue(0);
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#666" testID="loading_indicator" />;
        }
        if (greeting) {
            return (
                <Animated.Text
                    style={[
                        styles.greetingText,
                        {
                            transform: [
                                {
                                    rotate: rotateAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        },
                    ]}
                    accessibilityLabel="greeting_text"
                >
                    {greeting}!!!
                </Animated.Text>
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, colorScheme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
            {!greeting && !loading && (
                <Text style={styles.title} accessibilityLabel="welcome_text">
                    Welcome to the Advanced Detox Demo
                </Text>
            )}
            {renderContent()}
            {!greeting && !loading && (
                <>
                    <AnimatedButton
                        title="Say Hello"
                        onPress={() => {
                            startBounce();
                            debouncedOnButtonPress('Hello');
                        }}
                        testID="hello_btn"
                        bounceAnim={bounceAnim}
                        style={styles.helloButton}
                    />
                    <AnimatedButton
                        title="Say World"
                        onPress={() => {
                            startBounce();
                            debouncedOnButtonPress('World');
                        }}
                        testID="world_btn"
                        bounceAnim={bounceAnim}
                        style={styles.worldButton}
                    />
                    <AnimatedButton
                        title="Say Goodbye"
                        onPress={() => {
                            startBounce();
                            debouncedOnButtonPress('Goodbye, World');
                        }}
                        testID="goodbye_btn"
                        bounceAnim={bounceAnim}
                        style={styles.goodbyeButton}
                    />
                </>
            )}
        </View>
    );
};

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const AnimatedButton = ({ title, onPress, bounceAnim, style, testID }) => {
    return (
        <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
            <TouchableOpacity testID={testID} style={[styles.button, style]} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightBackground: {
        backgroundColor: '#f8f8f8',
    },
    darkBackground: {
        backgroundColor: '#333',
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

AppRegistry.registerComponent('DetoxStart', () => DetoxStart);

export default DetoxStart;
