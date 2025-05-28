import { View, Text, Pressable } from "react-native";
import { useToggle } from "../hooks/useToggle";

export default function ChangeTheme() {

    const theme = useToggle(false);
    //const {value, toggle} = useToggle(false)

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
        }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                현재 상태: {theme.value ? 'ON' : 'OFF'}
            </Text>
            <Pressable
                onPress={theme.toggle}
                style={{
                    backgroundColor: theme.value ? '#CCC' : '#000',
                    padding: 12,
                    borderRadius: 8,
                }}
            >
                <Text style={{color:'white', fontSize: 18}}>상태</Text>
            </Pressable>
        </View>
    )
}