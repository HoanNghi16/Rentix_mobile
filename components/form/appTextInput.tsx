import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
  secureToggle?: boolean; // bật để có icon ẩn/hiện mật khẩu
};

export default function AppTextInput({
  label,
  error,
  secureToggle,
  secureTextEntry,
  ...rest
}: Props) {
  const { colors } = useColor();
  const styles = createStyleSheet(colors);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.secondaryText}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          {...rest}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setHidden((v) => !v)} hitSlop={10}>
            {hidden ? (
              <EyeOff size={20} color={colors.secondaryText} />
            ) : (
              <Eye size={20} color={colors.secondaryText} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 16,
    },
    label: {
      color: colors.secondaryText,
      fontSize: 13,
      marginBottom: 6,
      fontWeight: "500",
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 14,
      height: 50,
      borderWidth: 1,
      borderColor: colors.surface,
    },
    inputRowError: {
      borderColor: "#EF4444",
    },
    input: {
      flex: 1,
      color: colors.primaryText,
      fontSize: 15,
    },
    error: {
      color: "#EF4444",
      fontSize: 12,
      marginTop: 4,
    },
  });