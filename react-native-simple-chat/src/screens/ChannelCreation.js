import styled from 'styled-components'
import { Alert, Text } from 'react-native'
import { useState, useRef, useEffect, useContext } from 'react';
import { Input, Button, Spinner } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createChannel } from '../utils/firebase';
import { ProgressContext } from '../contexts';

const Container = styled.View`
    flex : 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`

const ChannelCreation = ({ navigation }) => {

    //타이틀과 설명
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //description에 포커스를 주기 위해 useRef사용
    const descriptionRef = useRef();

    //타이틀이 비어있을 때 표시할  에러 메시지
    const [errorMessage, setErrorMessage] = useState(true);

    //Create버튼 활성/비활성화 관리
    const [disabled, setDisabled] = useState(true);

    const {spinner} = useContext(ProgressContext);

    //title, description, errorMessage 상태가 바뀔때 disabled 여부
    //title이 없거나 errorMessage가 있으면 disabled
    useEffect(() => {
        setDisabled(!(title && !errorMessage));
    }, [title, description, errorMessage]);

    //타이틀이 변경될 때 호출되는 함수, 공백 체크 후 에러메시지를 업데이트
    const _handleTitleChange = (title) => {
        setTitle(title);
        setErrorMessage(title.trim() ? '' : 'Please enter the title.')
    }

    //제목과 설명을 입력하고 Create버튼을 눌렀을 때
    //firebase에 채널을 생성하기
    const _handleCreateButtonPress = async () => {
        try {
            spinner.start();
            const id = await createChannel({title, description});
            //생성된 채널 화면으로 이동하며, id와 title정보를 함께 전달
            //replace를 사용해 현재 스택을 교체
            navigation.replace('Channel', {id, title});
        } catch (error) {
            Alert.alert('Creation Error', error.message);
        } finally {
            spinner.stop();
        }
    }

    return (
        <Container>
            {/* 채팅방 제목을 작성할 Input */}
            <Input
                label="Title"
                value={title}
                onChangeText={_handleTitleChange}
                onSubmitEditing={() => {
                    //타이틀 양 끝 공백 제거 후 description 입력창으로 이동
                    setTitle(title.trim());
                    descriptionRef.current.focus();
                }}
                onBlur={() => setTitle(title.trim())}
                placeholder='Title'
                returnKeyType="next"
                maxLength={20}
            />
            {/* 채팅방 설명을 작성할 Input */}
            <Input
                ref={descriptionRef}
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                onSubmitEditing={() => {
                    //타이틀 양 끝 공백 제거 후 description 입력창으로 이동
                    setDescription(description.trim());
                    _handleCreateButtonPress();
                }}
                onBlur={() => setDescription(description.trim())}
                placeholder='Description'
                returnKeyType="done"
                maxLength={40}
            />
            {/* 에러메시지 표시 영역 */}
            <ErrorText>{errorMessage}</ErrorText>
            {/* 채널 생성 버튼 (비활성화 여부는 disabled state로 제어) 
            버튼을 눌렀을 때 콘솔에 제목과 설명을 띄워주세요 */}
            <Button
                title="Create"
                onPress={_handleCreateButtonPress}
                disabled={disabled}
            />
        </Container>
    )
}

export default ChannelCreation;