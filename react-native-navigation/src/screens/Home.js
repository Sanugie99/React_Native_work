import {Button} from 'react-native'
import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Container = styled.View`
    align-items : center;
    justify-content : center;
    background-color : #fff;
`

const StyledText = styled.Text`
    font-size : 30px;
    margin-bottom : 10px;
`

//Stack.Screen에 등록만 하면 별도의 props 전달 없이도 자동으로 navigation객체가 주입된다.
//navigation객체의 navigate()메서드를 통해서 화면을 이동할 수 있다.
//navigate메서드의 첫번째 인자로 다른 스크린의 name값을 전달하면 된다.
const Home = ({navigation}) => {
    return(
        <SafeAreaView style={{flex : 1}}>
            <Container>
                <StyledText>Home</StyledText>
                <Button 
                    title="go to the list screen" 
                    onPress={() => {navigation.navigate('List')}}/>
            </Container>
        </SafeAreaView>
    )
}

export default Home;