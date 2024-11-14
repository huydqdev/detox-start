import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator,
    useColorScheme,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { Camera } from 'react-native-camera';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

const AudioMicDetox = () => {
    const [greeting, setGreeting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bounceAnim] = useState(new Animated.Value(1));
    const [rotateAnim] = useState(new Animated.Value(0));
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasAudioPermission, setHasAudioPermission] = useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        requestMediaPermissions();
    }, []);

    const requestMediaPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const cameraPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app requires access to your camera.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                const audioPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Audio Permission',
                        message: 'This app requires access to your microphone.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                setHasCameraPermission(cameraPermission === PermissionsAndroid.RESULTS.GRANTED);
                setHasAudioPermission(audioPermission === PermissionsAndroid.RESULTS.GRANTED);
            } catch (err) {
                console.warn(err);
            }
        } else {
            // iOS permission handling
        }
    };

    const onButtonPress = (newGreeting) => {
        setLoading(true);
        setTimeout(() => {
            setGreeting(newGreeting);
            setLoading(false);
            startRotate();
        }, 1000);
    };

    const debouncedOnBtnPress = debounce(onBtnPress, 500);

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
                    {hasCameraPermission && (
                        <Camera
                            style={styles.cameraPreview}
                            type={Camera.Constants.Type.front}
                        />
                    )}
                    {hasAudioPermission && (
                        <TouchableOpacity
                            onPress={() => {
                                startRecording();
                            }}
                            style={styles.audioBtn}
                        >
                            <Text style={styles.audioBtnText}>Record Audio</Text>
                        </TouchableOpacity>
                    )}
                    <AnimatedButton
                        title="Say Hello"
                        onPress={() => {
                            startBounce();
                            debouncedOnBtnPress('Hello');
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
    Btn: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    helloBtn: {
        backgroundColor: '#4caf50',
    },
    worldBtn: {
        backgroundColor: '#2196f3',
    },
    goodbyeBtn: {
        backgroundColor: '#f44336',
    },
    BtnText: {
        color: '#fff',
        fontSize: 16,
    },
    cameraPreview: {
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
    audioBtn: {
        backgroundColor: '#666',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
    },
    audioBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});

AppRegistry.registerComponent('AudioMicDetox', () => AudioMicDetox);

export default AudioMicDetox;
