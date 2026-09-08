import AppButton from "@/components/form/appButton";
import AppTextInput from "@/components/form/appTextInput";
import { useAuth } from "@/providers/auth/authProvider";
import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const { colors } = useColor();
    const styles = createStyleSheet(colors);
    const {login} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleLogin = async () => {
        const newErrors: typeof errors = {};
        if (!email.trim()) newErrors.email = "Vui lòng nhập email";
        if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            login()
            router.replace("/(tabs)")
        // TODO: gọi API đăng nhập ở đây
        // await authService.login(email, password);
        } finally {
        setLoading(false);
        }
    };

return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
        >
        <View style={styles.logoWrapper}>
            <Image
                source={require("@/assets/images/rentix_logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            {/* <Text style={styles.logoText}>Rentix</Text> */}
        </View>
        <View style={styles.card}>
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.subtitle}>
                Nhập thông tin tài khoản để tiếp tục
            </Text>

            <AppTextInput
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
            />

            <AppTextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                secureTextEntry
                secureToggle
                value={password}
                onChangeText={setPassword}
                error={errors.password}
            />

            <TouchableOpacity style={styles.forgotWrapper}>
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <AppButton title="Đăng nhập" loading={loading} onPress={handleLogin} />
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
);
}

const createStyleSheet = (colors: ColorType) =>
StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    logoWrapper: {
        backgroundColor: colors.background,
        padding: "auto",
        height: "20%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    logo: {
        width: 66,
        height: 66,
    },
    logoText: {
        color: colors.primaryText,
        fontSize: 20,
        fontWeight: "700",
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#000",
        borderRadius: 32,
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 24,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    title: {
        color: colors.primaryText,
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
    },
    subtitle: {
        color: colors.secondaryText,
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
        marginBottom: 28,
    },
    forgotWrapper: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotText: {
        color: colors.buttonBackground,
        fontSize: 13,
        fontWeight: "500",
    },
});