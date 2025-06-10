import styled from 'styled-components';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespce } from '../utils/common';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useRef, useState, useEffect, useContext } from 'react';
import { images } from '../utils/images';
import { signup } from '../utils/firebase';
import { Alert } from 'react-native';
import { ProgressContext, UserContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding : 10px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`

const Signup = () => {

  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setIsDisabled] = useState(true);

  //프로필사진 이미지URL
  const [photoURL, setPhotoURL] = useState(images.photo);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  //조건에 맞지 않을 때 에러문구
  useEffect(() => {
    let _errorMessage = '';
    if (!name) {
      _errorMessage = 'Please enter your name.';
    } else if (!validateEmail(email)) {
      _errorMessage = 'Please verify your email.';
    } else if (password.length < 6) {
      _errorMessage = 'The password must contain 6 characters at least.';
    } else if (password !== passwordConfirm) {
      _errorMessage = 'Passwords need to match';
    } else {
      _errorMessage = '';
    }
    setErrorMessage(_errorMessage);
  }, [name, email, password, passwordConfirm])

  //조건에 따라 버튼 활성화/비활성화하기
  useEffect(() => {
    setIsDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    )
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      const user = await signup({ email, password, name, photoURL });
      dispatch(user);
      console.log(user);
      Alert.alert('Signup Success', user.email);
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={80}
      enableOnAndroid={true}
    >
      <Container>
        {/* 프로필 사진 */}
        <Image
          rounded
          url={photoURL}
          showButton
          onChangeImage={url => setPhotoURL(url)}
        />

        {/* 이름 입력 */}
        <Input
          label="name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />

        {/* 이메일 입력 */}
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespce(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />

        {/* 비밀번호 입력 */}
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespce(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="next"
          isPassword
        />

        {/* 비밀번호 일치 여부 */}
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespce(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />

        {/* 에러메시지 출력 */}
        <ErrorText>{errorMessage}</ErrorText>

        {/* 회원가입 버튼 */}
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;