import styled from "styled-components";
import { useFetch } from "../hooks/useFetch";

const StyledImage = styled.Image`
    background-color : #7f8c8d;
    width : 300px;
    height : 300px;
`;

const ErrorMessage = styled.Text`
    font-size : 18px;
    color : #e74c3c;
`;

const URL = 'https://dog.ceo/api/breeds/image/random';
const Dog = () => {
    const {data, error} = useFetch(URL);

    return(
        <>
            <StyledImage source={data?.message ? { uri : data.message} : null} />
            <ErrorMessage>{error ?.message} </ErrorMessage>
        </>
    )
}

export default Dog;