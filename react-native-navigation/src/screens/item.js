import { useLayoutEffect } from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`
//List에서 누른 하나의 item의 정보를 출력
//전달된 내용은 컴포넌트의 props로 전달되는 route객체의 params에 들어있다
//const route = {params : {id.itme_id, name:item.name}}
const Item = ({ route }) => {
    return (
        <Container>
            <StyledText>Item</StyledText>
            <StyledText>ID : {route.params.id}</StyledText>
            <StyledText>Name : {route.params.name}</StyledText>
        </Container>
    );
}

export default Item;