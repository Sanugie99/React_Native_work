import styled from "styled-components";


const StyledInput = styled.TextInput`
    width: 100%;
    heigth : 60px;
    margin : 3px 0;
    padding : 15px 20px;
    border-radius : 10px;
    background-color : ${({theme}) => theme.itemBackground};
    font-size: 25px;
    color : ${({theme}) => theme.text};
`

const Input = () => {
    return(
        <StyledInput />
    )
}

export default Input;