import { useState } from "react";
import { View } from 'react-native';
import styled from "styled-components";
import Button from "./Button";

const StyledText = styled.Text`
    font-size: 24px;
    margin : 10px;
`
const Counter = () => {

    const [count, setCount] = useState(0);

    return (
        <View>
            <StyledText>
                Count : {count}
            </StyledText>
            <Button title="+" 
            //onPress 이벤트가 실행되기 전에 함수가 실행되어버릴수 있기 때문에
            // onPress={setCount(prev => prev+1)}
                onPress={() => {
                    setCount(prev => prev + 1)
                    setCount(prev => prev + 1)
                }} 
            />
            <Button title="-" onPress={() => { setCount(count - 1) }} />
        </View>
    )
}

export default Counter;