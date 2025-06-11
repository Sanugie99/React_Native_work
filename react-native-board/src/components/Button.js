import styled from "styled-components";
import { MaterialIcons } from '@expo/vector-icons';

const Button = styled.onPressable`
    border-radius: 28px;
    background-color: blue;
    justify-content: center;
    align-items: center;
`

const AddPostButton = ({ onPrees }) => {
    return(
        <Button onPrees={onPrees}>
            <MaterialIcons name="add" size={28} color='#fff'/>
        </Button>
    )
}

export default AddPostButton;