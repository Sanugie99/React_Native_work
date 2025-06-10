import styled, { ThemeContext } from "styled-components";
import { Alert, Text } from "react-native";
import { getCurrentUser, logout, updateUserPhoto } from "../utils/firebase";
import { ProgressContext, UserContext } from "../contexts";
import { useContext, useState } from "react";
import { Button, Image, Input } from "../components";

const Container = styled.View`
    flex : 1;
    background-color : ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`

const Profile = () => {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    const theme = useContext(ThemeContext);
    
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (error) {
            console.log('[Profile] logout: ', e.message)
        } finally {
            dispatch({});
            spinner.stop();
        }
    }

    const _handlePhotoChange = async (url) => {
        try {
            spinner.start();
            const updateUser = await updateUserPhoto(url);
            setPhotoUrl(updateUser.photoUrl);
        } catch (error) {
            Alert.alert('photo Error', error.message);
        } finally{
            spinner.stop();
        }
    }
    return (
        <Container>
            <Image
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton
                rounded
            />
            <Input lable='Name' value={user.name} disabled/>
            <Input lable='Email' value={user.email} disabled/>
            <Button 
                title='logout' 
                onPress={_handleLogoutButtonPress} 
                containerStyle={{ marginTop:30, backgroundColor: theme.buttonLogout}}
            />
        </Container>
    )
}

export default Profile;