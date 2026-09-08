import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import { Bell } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showNotification?: boolean;
  onPressNotification?: () => void;
};

export default function AppHeader({ showNotification = true, onPressNotification }: Props) {
  const { colors } = useColor();
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* Nếu có file logo thì dùng Image, không thì fallback chữ */}
        <Image
          source={require("@/assets/images/rentix_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>Rentix</Text>
      </View>

      {showNotification && (
        <TouchableOpacity style={styles.iconButton} onPress={onPressNotification} hitSlop={10}>
          <Bell size={22} color={colors.primaryText} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    container: {
      height: 56,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.surface,
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    logo: {
      width: 28,
      height: 28,
    },
    brand: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "700",
    },
    iconButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
    },
  });