import { useColor } from "@/providers/colors/colorProvider";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatLayout(){
    const {colors} = useColor()
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.surfaceSecondary}}>
            <Stack screenOptions={{headerShown: false}}>
            </Stack>
        </SafeAreaView>
    )
}