import {Button} from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`
const StyledText = styled.Text`
    font-size : 30px;
    margin-bottom : 10px;
`
const items = [
    {_id : 1, name : 'React Native'},
    {_id: 2, name : 'React Navigation'},
    {_id: 3, name : 'Hanbit'}
]

//화면을 넘어가면서 데이터를 같이 전달해야 하는 경우
//navigate(name값,전달하려는 데이터);
const List = ({navigation,route}) => {
    return(
        <Container>
            <StyledText>List</StyledText>
            {items.map(item => (
                <Button
                    key={item.id}
                    title={item.name}
                    // Item화면으로 이동하면서 화면의 id와 name을 함께 전달
                    onPress={() => navigation.navigate('Item',{id:item._id, name:item.name})}
                />
                ))}
        </Container>
    )
}

export default List;