import AppHeader from "@/components/layout/appHeader";
import { useColor } from "@/providers/colors/colorProvider";
import { Tabs } from "expo-router";
import { FileText, Home, Receipt, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { colors } = useColor();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <AppHeader/>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.buttonBackground,
          tabBarInactiveTintColor: colors.secondaryText,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.background,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang chủ",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="contracts"
          options={{
            title: "Hợp đồng",
            tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="invoices"
          options={{
            title: "Hóa đơn",
            tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Hồ sơ",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}