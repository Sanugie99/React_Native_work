import styled from "react-native-styled-components";

const StyledButton = styled.TouchableOpacity`
    width: 80%;
    padding: 14px;
    background-color: ${props => props.backgroundColor || '#3498db'};
    margin: 10px 0;
    border-radius: 8px;
    align-items: center;
`;

const Title = styled.Text`
    font-weight: bold;
    color: white;
`;

const Button = ({ title, onPress, backgroundColor }) => {
  return (
    <StyledButton onPress={onPress} backgroundColor={backgroundColor}>
      <Title>{title}</Title>
    </StyledButton>
  );
};

export default Button;