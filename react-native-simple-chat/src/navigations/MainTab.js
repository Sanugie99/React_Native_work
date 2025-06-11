import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile, ChannelList } from "../screens";
import { MaterialIcons } from "@expo/vector-icons"
import { ThemeContext } from "styled-components";
import { useContext, useEffect } from "react";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);
    return (
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    )
}

const MainTab = ({ navigation, route }) => {

    const theme = useContext(ThemeContext);
    //모든 탭에 대해 선택되면 tabActiveColor로, 선택이 안되면 tabInactiveColor로 설정
    //각 스크린에 대해 아이콘을 줘야한다
    //TabBarIcon이라는 함수를 만들고 매개변수로 {forcused, name}을 받는다.
    //<MaterialIcons>를 반환한다 속성은 name, size는 26, color는 focused면 tabActiveColor, 아니면 tabInactiveColor
    //첫번째 스크린에 들어갈 아이콘은 name은 chat-bubble, chat-bubble-outline
    //두번째 스크린에 들어갈 아이콘은 name은 person, person-outline

    useEffect(() => {
        const titles = route.state?.routeNames || ['Channels'];
        const index = route.state?.index || 0;
        navigation.setOptions({
            headerTitle: titles[index],
        });
    }, [route])

    return (
        //Channel List, Profile 컴포넌트를 Screen으로 갖도록 설정
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.tabActiveColor,
                tabBarInactiveTintColor: theme.tabInactiveColor,
                headerTitleAlign: 'center',
            }}
        >
            <Tab.Screen
                name="Channels"
                component={ChannelList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            name={focused ? 'chat-bubble' : 'chat-bubble-outline'}
                        />
                    ),
                    headerRight: () => (
                        <MaterialIcons
                            name="add"
                            size={26}
                            style={{ margin: 10 }}
                            onPress={() => navigation.navigate('Channel Creation')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            name={focused ? 'person' : 'person-outline'}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab;