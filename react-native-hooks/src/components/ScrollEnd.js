import { useRef } from "react";
import { ScrollView, Text, View, Button, Animated } from "react-native";

const ScrollEnd = () => {
    const ScrollRef = useRef(null);

    const handleScrollToButton = () => {
        ScrollRef.current?.scrollToEnd({Animated:true})
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title="맨 아래로 스크롤" onPress={handleScrollToButton} />
            <ScrollView ref={ScrollRef} style={{ marginTop: 10, padding: 10 }}>
                {Array.from({ length: 30 }, (_, i) => (
                    <Text key={i} style={{ fontSize: 18, margin: 5 }}>
                        아이템 {i + 1}
                    </Text>
                ))}
            </ScrollView>
        </View>
    )
}

export default ScrollEnd;