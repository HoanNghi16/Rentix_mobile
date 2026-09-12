import { useColor } from "@/providers/colors/colorProvider";
import { ColorType } from "@/types/themes";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen(){
    const {colors} = useColor()
    const styles = createStyleSheet(colors)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.metaWrapper}>
                <View style={styles.avatarWrapper}>
                    <Image style={styles.avatar} source={require("@/assets/images/rentix_logo.png")}/>
                </View>
                <Text>Nguyễn Dương Hoàng Nghi</Text>
            </View>
        </ScrollView>
    )
}

const createStyleSheet = (colors: ColorType) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.surface,
    },
    metaWrapper:{

    },
    avatarWrapper:{
        borderRadius: 100,
        width: 106,
        textAlign: "center",
        backgroundColor: colors.background,
        borderStyle:"solid",
        borderWidth: 3,
        borderColor: colors.surfaceSecondary,
    },
    avatar:{
        aspectRatio: 1,
        width: 100,
        height: 100,
    }
})