import styled from "styled-components";
import Counter from "./components/Counter";
import Parent from "./components/Parent";
import Form from "./components/Form";
import { useState } from "react";
import Button from "./components/Button";
import Length from "./components/Length";
import AverageCalculator from "./components/Average";
const Container = styled.View`
    flex:1;
    background-color:#fff;
    justify-content : center;
    align-items : center;
`

const App = () => {
    // const [btn, setBtn] = useState(true);
    return(
    <Container>
        {/* <Counter/> */}
        {/* <Parent/> */}
        {/* {btn && <Form />}
        <Button 
            title={btn ? "Hide" : "show"}
            onPress={() => setBtn(prev => !prev)}
        /> */}
        {/* <Length/> */}
        <AverageCalculator/>
    </Container>
    )
}

export default App;