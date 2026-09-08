import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

export default function AppButton({ title, loading, disabled, ...rest }: Props) {
  const { colors } = useColor();
  const styles = createStyleSheet(colors);

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors.buttonText} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.buttonBackground,
      height: 52,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    text: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "600",
    },
  });