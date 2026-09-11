import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import { router } from "expo-router";
import { Bell, MessageCircle } from "lucide-react-native";
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
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.iconButton} onPress={()=>router.push("/chat")} hitSlop={10}>
            <MessageCircle size={22} color={colors.primaryText} />
        </TouchableOpacity>
        {showNotification && (
          <TouchableOpacity style={styles.iconButton} onPress={onPressNotification} hitSlop={10}>
            <Bell size={22} color={colors.primaryText} />
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
}

const createStyleSheet = (colors: ColorType) =>
  StyleSheet.create({
    container: {
      height: "10%",
      paddingHorizontal: 14,
      paddingRight: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.background,
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    logo: {
      width: 40,
      height:40,
    },
    brand: {
      color: colors.primaryText,
      fontSize: 25,
      fontWeight: "700",
    },
    buttonWrapper:{
      flexDirection:"row",
      gap: 8,
    }
    ,
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
    },
  });