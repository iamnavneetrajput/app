import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDERS } from '../utils/constant'; // Assuming constants are in this file
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Define Screen Types
type ScreenType = 'splash' | 'login' | 'register' | 'otp' | 'forgotPassword';

// Custom Hook for Fade In Animation
const useFadeIn = (duration: number) => {
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return fadeAnim;
};

// AuthScreen Component
const AuthScreen = () => {
    const [screen, setScreen] = useState<ScreenType>('splash');

    return (
        <View style={styles.container}>
            <Text style={styles.companyName}>Hello</Text>
            {screen === 'splash' && <SplashScreen setScreen={setScreen} />}
            {screen === 'login' && <LoginScreen setScreen={setScreen} />}
            {screen === 'register' && <RegistrationScreen setScreen={setScreen} />}
            {screen === 'otp' && <OTPScreen setScreen={setScreen} />}
            {screen === 'forgotPassword' && <ForgotPasswordScreen setScreen={setScreen} />}
        </View>
    );
};

// Splash Screen
const SplashScreen = ({ setScreen }: { setScreen: (screen: ScreenType) => void }) => (
    <View style={styles.splashContainer}>
        <Text style={styles.title}>Unfolding at the moment</Text>
        <Text style={styles.subtitle}>Start your journey now</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
        <Ionicons name="log-in-outline" size={20} color={COLORS.light.background} />
            <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => setScreen('register')}>
            <Ionicons name="person-add-outline" size={20} color={COLORS.light.background} />
            <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
    </View>
);

// Input Field with Icon
const InputField = ({ placeholder, icon }: { placeholder: string; icon: string }) => (
    <View style={styles.inputContainer}>
        <Ionicons name={icon as any} size={24} color={COLORS.light.secondaryText} style={styles.icon} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={COLORS.light.secondaryText}
        />
    </View>
);

// Password Input Field with Forgot Password
const PasswordInput = ({ setScreen }: { setScreen?: (screen: ScreenType) => void }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={COLORS.light.secondaryText}
            />
            <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color={COLORS.light.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => setScreen && setScreen('forgotPassword')} // Navigate to Forgot Password screen
            >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

// Login Screen
const LoginScreen = ({ setScreen }: { setScreen: (screen: ScreenType) => void }) => {
    const fadeAnim = useFadeIn(1000);

    return (
        <View style={styles.authContainer}>
            <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim }]}>Sign in to post</Animated.Text>
            <InputField placeholder="Email" icon="mail-outline" />
            <PasswordInput setScreen={setScreen} />
            <TouchableOpacity style={styles.button} onPress={() => setScreen('otp')}>
            <Ionicons name="log-in-outline" size={20} color={COLORS.light.background} />
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => { }}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="logo-google" size={20} color={COLORS.dark.text}  />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen('register')}>
                <Text style={styles.switchText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

// Registration Screen
const RegistrationScreen = ({ setScreen }: { setScreen: (screen: ScreenType) => void }) => {
    const fadeAnim = useFadeIn(1000);

    return (
        <View style={styles.authContainer}>
            <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim }]}>Sign up to post</Animated.Text>
            <InputField placeholder="Username" icon="person" />
            <InputField placeholder="Email" icon="mail" />
            <PasswordInput />
            <TouchableOpacity style={styles.button} onPress={() => setScreen('otp')}>
            <Ionicons name="arrow-forward-outline" size={20} color={COLORS.light.background} />
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => { }}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="logo-google" size={20} color={COLORS.dark.text} />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen('login')}>
                <Text style={styles.switchText}>Already have an account? Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

// Forgot Password Screen
const ForgotPasswordScreen = ({ setScreen }: { setScreen: (screen: ScreenType) => void }) => {
    const [emailOrUsername, setEmailOrUsername] = useState('');

    return (
        <View style={styles.authContainer}>
            <Text style={styles.screenTitle}>Recover Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email or username"
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                placeholderTextColor={COLORS.light.secondaryText}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setScreen('otp')} // Navigate to OTP screen after email/username submission
            >
                 <Ionicons name="arrow-forward-outline" size={20} color={COLORS.light.background} />
                <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen('login')}>
                <Text style={styles.switchText}>Back to Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

// OTP Screen
const OTPScreen = ({ setScreen }: { setScreen: (screen: ScreenType) => void }) => {
    const [otp, setOtp] = useState('');

    return (
        <View style={styles.authContainer}>
            <Text style={styles.screenTitle}>Enter OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                placeholderTextColor={COLORS.light.secondaryText}
            />
            <TouchableOpacity style={styles.button} onPress={() => { /* Handle OTP verification */ }}>
            <Ionicons name="checkmark-done-outline" size={20} color={COLORS.light.background} />
            <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen('login')}>
                <Text style={styles.switchText}>Back to Sign in</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyName: {
        position: 'absolute',
        top: SPACING.medium,
        left: SPACING.medium,
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.light.primary,
    },
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        padding: SPACING.medium,
    },
    title: {
        fontSize: FONT_SIZES.xxLarge,
        width: '100%',
        textAlign: 'left',
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.large,
    },
    subtitle: {
        width: '100%',
        fontSize: FONT_SIZES.medium,
        color: COLORS.light.secondaryText,
        marginBottom: SPACING.small,
    },
    screenTitle: {
        width: '100%',
        fontSize: FONT_SIZES.medium,
        marginBottom: SPACING.xmedium,
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: SPACING.small,
    },
    input: {
        width: '100%',
        padding: SPACING.xmedium,
        borderWidth: BORDERS.width,
        borderColor: COLORS.light.border,
        borderRadius: BORDERS.radius,
        backgroundColor: COLORS.light.background,
        fontSize: FONT_SIZES.medium,
    },
    icon: {
        position: 'absolute',
        right: SPACING.small,
        top: '50%',
        transform: [{ translateY: -26 }],
    },
    forgotPassword: {
        marginTop: SPACING.xsmall,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        padding: SPACING.xsmall,
        fontSize: FONT_SIZES.small,
        color: COLORS.light.primary,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.light.primary,
        paddingVertical: SPACING.xmedium,
        width: '100%',
        borderRadius: BORDERS.radiusXLarge,
        alignItems: 'center',
        marginTop: SPACING.medium,
    },
    buttonSecondary: {
        flexDirection: 'row',
        backgroundColor: COLORS.light.primary,
        paddingVertical: SPACING.xmedium,
        width: '100%',
        borderRadius: BORDERS.radiusXLarge,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.small,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.light.background,
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        marginLeft: SPACING.small,
    },
    switchText: {
        color: COLORS.light.primary,
        marginTop: SPACING.medium,
        fontSize: FONT_SIZES.medium,
    },
});

export default AuthScreen;
