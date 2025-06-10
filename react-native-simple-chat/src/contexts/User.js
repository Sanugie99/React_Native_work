import { useState, createContext, Children } from "react";

const UserContext = createContext({
    user: { email: null, uid: null },
    dispatch: () => { },
})

//UserProvider를 만든다.
//useState하나 만들고 빈 객체로 초기화 한다. [user, setUser]
//dispatch함수를 정의한다.(매개변수는 email, uid)
//인자에 들어온 email과 uid를 state에 세팅한다.
//user와 dispatch를 전역으로 보낸다.

const UserProvider = ({ children }) => {
    
    //useState[user, setUser]를 빈 객체로 초기화
    const [user, setUser] = useState([]);

    //dispatch함수를 정의 후 email,uid를 매개변수로 받아 인자에 들어온 email과 uid를 state에 세팅
    const dispatch = ({ email, uid }) => {
        setUser({ email, uid })
    }

    //user와 dispatch를 전역으로 보내줌
    const value = { user, dispatch };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };