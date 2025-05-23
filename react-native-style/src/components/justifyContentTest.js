import { View, Text, Button } from "react-native";
import { box_styles } from '../styles'
import { useState } from "react";


//justifyContent
//주 축을 따라 요소를 어떻게 배치할지 방식을 설정하는 속성
const JustifyContentTest = () => {
    const [justifyContent, setJustifyContent] = useState('flex-start');

    return (
        <View style={box_styles.container}>
            <Text style={box_styles.title}>FlexDirection: {justifyContent}</Text>
            <View style={[box_styles.boxContainer, { justifyContent: justifyContent }]}>
                <View style={box_styles.box}><Text style={box_styles.boxText}>1</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>2</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>3</Text></View>
            </View>
            <View style={box_styles.buttons}>
                <Button title="Flex Start" onPress={() => setJustifyContent('flex-start')} />
                <Button title="Center" onPress={() => setJustifyContent('center')} />
                <Button title="Flex End" onPress={() => setJustifyContent('flex-end')} />
                <Button title="Space Between" onPress={() => setJustifyContent('space-between')} />
                <Button title="Space Around" onPress={() => setJustifyContent('space-around')} />
                <Button title="Space Evenly" onPress={() => setJustifyContent('space-evenly')} />
            </View>
        </View>
    )
}

export default JustifyContentTest;