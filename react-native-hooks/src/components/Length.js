import { useMemo, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { View } from "react-native";

const StyledText = styled.Text`
    font-size: 24px;
`
const getLength = text => {
  console.log(`Target Text: ${text}`);
  return text.length;
};

const list = ["JavaScript", "Expo", "Expo", "React Native"];

let idx = 0;
const Length = () => {
    
    const [text, setText] = useState(list[0]);
    const length = useMemo(() => getLength(text),[text]);

    const textLength = () => {
        ++idx;
        if(idx < list.length) setText(list[idx]);
    }

    return (
        //문자열
        //해당 문자열의 길이
        //버튼(버튼을 누를 때 마다 배열을 순환하면서 문자열의 길이를 구하는 기능)
        <View>
            <StyledText>Text: {text}</StyledText>
            <StyledText>Length: {length}</StyledText>
            <Button title="Length" onPress={textLength}/>
        </View>

    )
}

export default Length;