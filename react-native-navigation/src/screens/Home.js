import { Button } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    align-items: center;
`

const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`

//Stack.Screen에 등록만 하면 별도의 props 전달 없이도 자동으로 Navigta
const Home = ({navigation}) => {
    return(
        <Container>
            <StyledText>Home</StyledText>
            <Button 
                title="go to the list screen"
                onPress={() => {navigation.navigate('List')}}
            />
        </Container>
    )
}

export default Home;