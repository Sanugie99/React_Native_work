import { useState, createContext } from 'react';

// ProgressContext를 생성
// 기본값으로 inProgress는 false, spinner는 빈 함수(dummy function)를 제공한다.
const ProgressContext = createContext({
    inProgress: false,
    spinner: () => { },
});

// ProgressProvider 컴포넌트는 하위 컴포넌트에게 진행 상태와 spinner 제어 함수를 제공하는 역할을 한다.
const ProgressProvider = ({ children }) => {

    const [inProgress, setInProgress] = useState(false);

    // spinner 객체를 생성하여 start와 stop 메서드를 정의합니다.
    // start: 호출 시 inProgress를 true로 변경하여 진행 중임을 나타냅니다.
    // stop: 호출 시 inProgress를 false로 변경하여 진행 중이 아님을 나타냅니다.
    const spinner = {
        start: () => setInProgress(true),
        stop: () => setInProgress(false),
    };

    const value = { inProgress, spinner };

    return (
        <ProgressContext.Provider value={{ inProgress, spinner }}>
            {children}
        </ProgressContext.Provider>
    );
};

export { ProgressContext, ProgressProvider };