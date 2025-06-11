import styled, { ThemeContext } from "styled-components";
import { Text, FlatList } from 'react-native'
import { useState, useEffect, useLayoutEffect, useContext } from "react";
// Firestore 데이터베이스와 메시지 생성 함수를 가져옴
import { db, createMessage } from "../utils/firebase";
// Firestore에서 사용할 collection, onSnapshot, query, orderBy 함수를 가져옴
import { collection, onSnapshot, query, doc, orderBy } from "firebase/firestore";
import { Input } from "../components";
// GiftedChat 및 Send 컴포넌트를 react-native-gifted-chat에서 가져옴
import { GiftedChat, Send } from "react-native-gifted-chat";
// Expo에서 MaterialIcons 아이콘을 가져옴
import { MaterialIcons} from '@expo/vector-icons'
//현재 사용자 정보를 가져오는 유틸 함수를 가져옴
import { getCurrentUser } from "../utils/firebase";

// Container 컴포넌트: 채팅 화면 전체를 감싸는 View로, 테마의 background 색상을 적용합니다.
const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

//SendButton 컴포넌트: 메시지 전송 버튼 커스텀 컴포넌트
const SendButton = props => {
    const theme = useContext(ThemeContext);

    return(
        //GiftedChat의 Send컴포넌트를 사용하여 전송 버튼 렌더링
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width:44,
                geight:44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            {/* MaterialIcons를 사용하여 send아이콘을 표시 */}
            <MaterialIcons
                name='send'
                size={24}
                //텍스트가 있을 경우 sendButtonActive 없을 경우 sendButtonInactive 테마 적용
                color={props.text ? theme.sendButtonActive : theme.sendButtonInactive}
            />
        </Send>
    )
}

// Channel 컴포넌트: 채팅 채널 화면을 렌더링
const Channel = ({navigation, route}) => {

    // route 객체에서 params를 추출
    const {params} = route;
    // ThemeContext를 사용하여 현재 테마 정보 가져오기
    const theme = useContext(ThemeContext);
   // 현재 사용자의 uid, 이름, 프로필 사진 URL을 가져오기
    const { uid, name, photoUrl } = getCurrentUser();
    // 메시지 배열 상태를 선언
    const [messages, setMessages] = useState([]);

    // Firestore에서 메시지 데이터를 실시간 구독하여 가져오기
    useEffect(() => {
        // params.id가 없으면 아래 코드 실행 방지
        if (!params.id) return;

        // "channels" 컬렉션 아래에 있는 특정 채널의 "messages" 서브컬렉션 참조 생성
        const messagesRef = collection(db, "channels", params.id, "messages");

        // createdAt 필드를 기준으로 내림차순 정렬한 쿼리 생성
        const collectionQuery = query(messagesRef, orderBy("createdAt", "desc"));

        // onSnapshot을 사용해 실시간 데이터 구독 및 업데이트
        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
          // 각 문서 데이터를 배열로 변환, 문서 id를 포함시킴
          const list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          // 상태 업데이트
          setMessages(list);
        });
        // 컴포넌트 언마운트 시 구독 해제
        return () => unsubscribe();
      }, []);// 의존성 배열이 비어 있으므로 처음 렌더링 시 한 번 실행

      // useLayoutEffect를 사용해 네비게이션 옵션(헤더 제목)을 설정
      useLayoutEffect(() => {
        navigation.setOptions({headerTitle: params.title || 'Channel'})
      },[])

      // 메시지 전송 시 호출되는 함수
    const _handleMessageSend = async messageList => { 
        // GiftedChat에서 전달받은 메시지 배열의 첫 번째 메시지를 추출
        const newMessage = messageList[0];
        console.log(newMessage);
        try {
            // createMessage 함수를 통해 새로운 메시지를 Firestore에 저장
            await createMessage({ channelId: params.id, text: newMessage });
        } catch (error) {
            // 오류 발생 시 Alert를 통해 에러 메시지 표시
            Alert.alert('Send Message Error', error.message);
        }
    };

    // 채팅 화면 렌더링
    return (
        <Container>
            <GiftedChat
                // 리스트 뷰의 스타일을 테마의 background 색상으로 지정
                listViewProps={{
                    style: { backgroundColor: theme.background },
                }}
                placeholder="Enter a message..." 
                messages={messages}  // 채팅 메시지 배열 전달
                user={{ _id: uid, name, avatar: photoUrl }}  // 현재 사용자 정보 전달
                onSend={_handleMessageSend}  // 메시지 전송 시 호출되는 함수 지정
                alwaysShowSend={true}  // 항상 전송 버튼 표시
                textInputProps={{
                    autoCapitalize: 'none', // 자동 대문자 변환 해제
                    autoCorrect: false,     // 자동 수정 기능 해제
                    textContentType: 'none', // iOS에서 텍스트 컨텐츠 타입 지정 안함
                    underlineColorAndroid: 'transparent', // Android에서 밑줄 제거
                }}
                multiline={false}  // 입력창에서 다중 행 입력 허용 여부(false로 단일 행 입력)
                renderUsernameOnMessage={true}  // 메시지에 사용자 이름 표시
                scrollToBottom={true}  // 새 메시지 추가 시 스크롤 아래로 이동
                renderSend={props => <SendButton {...props} />}  // 커스텀 전송 버튼 렌더링
            />
        </Container>
    );
};

export default Channel;