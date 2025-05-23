import { View, Text, Button } from "react-native";
import { box_styles } from '../styles'
import { useState } from "react";

const FlexDirectionTest = () => {
    const [direction, setDirection] = useState('row');

    return(
        <View style={box_styles.container}>
            <Text style={box_styles.title}>FlexDirection: {direction}</Text>
            <View style={[box_styles.boxContainer, {flexDirection:direction}]}>
                <View style={box_styles.box}><Text style={box_styles.boxText}>1</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>2</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>3</Text></View>
            </View>

            <View style={box_styles.buttons}>
                {/* 버튼을 4개 만든다. title은 각각 row, column, row-reverse, column-reverse */}
                <Button title="row" onPress={() => setDirection('row')} />
                <Button title="colunm" onPress={() => setDirection('colunm')} />
                <Button title="row reverse" onPress={() => setDirection('row-reverse')} />
                <Button title="column reverse" onPress={() => setDirection('column-reverse')} />
            </View>
        </View>
    )
}

export default FlexDirectionTest;