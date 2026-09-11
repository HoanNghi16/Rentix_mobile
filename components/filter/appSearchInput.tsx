import { useColor } from "@/providers/colors/colorProvider"
import { ColorType } from "@/types/themes"
import { StyleSheet, TextInput } from "react-native"

interface SearchProps {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
}

export default function AppSearchInput(props: SearchProps){
    const {colors} = useColor()
    const styles = createStyleSheet(colors)
    return (
        <TextInput
            style={styles.searchInput}
            placeholderTextColor={colors.secondaryText}
            {...props}
        />
    )
}
const createStyleSheet = (colors: ColorType)=> StyleSheet.create({
    searchInput: {
        backgroundColor: colors.surfaceSecondary,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: colors.primaryText,
        fontSize: 14,
    },
})