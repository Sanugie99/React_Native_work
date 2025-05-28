import { useContext } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import ThemeContext from "../contexts/ThemeContext";

const ThemeView = styled.View`
  flex: 1;
  background-color: ${({ isDark }) => (isDark ? "#333" : "#fff")};
  justify-content: center;
  align-items: center;
`;

const ThemeText = styled.Text`
  color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
  font-size: 24px;
  margin: 20px;
`;

const ThemeComponent = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeView isDark={isDark}>
      <ThemeText isDark={isDark}>
        {isDark ? "다크 모드" : "라이트 모드"}
      </ThemeText>
      <Button title="테마 변경" onPress={toggleTheme} color={isDark ? "#ccc" : "#000"} />
    </ThemeView>
  );
};

export default ThemeComponent;