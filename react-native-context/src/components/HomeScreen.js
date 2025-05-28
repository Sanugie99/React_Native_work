import { useContext } from "react";
import { View, Text, Button } from "react-native";
import UserContext from "../contexts/UserContext";

const HomeScreen = () => {
  const { user, login, logout } = useContext(UserContext);

  console.log("user 상태:", user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {user ? (
        <>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            Welcome, {user.name}
          </Text>
          <Button title="로그아웃" onPress={logout} />
        </>
      ) : (
        <Button title="로그인" onPress={login} />
      )}
    </View>
  );
};

export default HomeScreen;