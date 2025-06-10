import styled from "react-native-styled-components";

const StyledTextInput = styled.TextInput`
  width: 80%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = ({ placeholder, value, onChangeText }) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;