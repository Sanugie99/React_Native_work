import { StatusBar, Image } from "react-native";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { ProgressProvider, UserProvider } from "./contexts";

// expo-asset : 로컬 이미지 / 파일을 앱에 미리 로드할 때 사용하는 패키지
import { Asset } from 'expo-asset';
// expo-font : 커스텀 폰트를 로드하는 라이브러리
import * as Font from 'expo-font';
// expo-splash-screen : 앱 실행시 스플래시 화면을 제어하는 라이브러리
import * as SplashScreen from 'expo-splash-screen';

import Navigation from "./navigations";

// 앱 시작 시 스플래시 화면이 자동으로 숨겨지지 않도록 설정
// 이 함수 호출 이후로는 내가 직접 hideAsync()를 호출할때까지 스플래시 화면이 유지된다.
SplashScreen.preventAutoHideAsync();

// 이미지 캐싱 함수 정의 : 문자열로 전달된 URL 이미지와 로컬 파일 이미지에 따라 각각 적절한 캐싱 방식으로 처리
const cacheImages = images => {
    // images 배열의 각 요소에 대해 다음과 같은 처리를 하겠다.
    return images.map(image => {
        // image가 문자열이면 (즉, 네트워크상의 URL 이미지라면)
        if (typeof image === 'string') {
            // Image.prefetch : URL 이미지를 미리 네트워크에서 받아서 캐싱해놓는다.
            return Image.prefetch(image);
        } else {
            // 문자열이 아니라면, 로컬 파일로 간주
            // Asset.fromModule(image).downloadAsync() : 로컬 파일을 미리 디바이스 스토리지에 다운로드
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = fonts => {
    // 폰트 캐싱 함수: 폰트 배열을 받아 각 폰트를 로드
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
    const [isReady, setIsReady] = useState(false); // 초기화 여부를 추적하는 상태 변수

    useEffect(() => {
        // useEffect에서 비동기 함수 호출하여 리소스를 로드
        const prepareResources = async () => {
            try {
                await _loadAssets(); // 리소스를 로드하는 비동기 함수 호출
            } catch (error) {
                console.warn(error); // 오류 발생 시 경고 메시지 출력
            } finally {
                // setIsReady(true); // 로딩이 완료되면 isReady를 true로 설정
                // await SplashScreen.hideAsync(); // 스플래시 화면 숨김
                setTimeout(async () => {
                    setIsReady(true);
                    await SplashScreen.hideAsync();
                }, 3000);
            }
        };

        prepareResources(); // 준비 함수 호출
    }, []); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    const _loadAssets = async () => {
        // 이미지와 폰트를 캐싱하여 리소스를 로드
        // require() : 로컬 파일 리소스(이미지, 동영상, 사운드 파일 등)를 가져오는데 사용한다.
        const imageAssets = cacheImages([require('../assets/splash.png')]); // 로컬 스플래시 이미지 캐싱
        const fontAssets = cacheFonts([]); // 추가적인 폰트가 있다면 이 배열에 추가 가능

        await Promise.all([...imageAssets, ...fontAssets]); // 모든 비동기 작업이 완료될 때까지 기다림
    };

    if (!isReady) {
        return (
            <Image
                source={require('../assets/splash.png')}
                style={{ flex: 1, resizeMode: 'contain', width: '100%', height: '100%' }}
            />
        );
    }

    return (
        // 로딩 완료 시 앱의 실제 UI를 렌더링
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProgressProvider>
                    <StatusBar barStyle="dark-content" />
                    <Navigation />
                </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App;