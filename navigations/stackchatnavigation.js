import { StackNavigator } from 'react-navigation'
import ChatsScreen from '../pages/chats';
import MessagesScreen from '../pages/msg'
// import ProfileSetupScreen from '../pages/profileSetup'

export default StackNavigator(
    {
        Chats: {
            screen: ChatsScreen,
        },
        Messages: {
            screen: MessagesScreen,
        },
        // Profile: {
        //     screen: VerifyScreen,
        // }
    },
    {
        initialRouteName: "Chats",
        navigationOptions: ({ navigation }) => {
            // console.log(navigation.state)
            // console.log(navigation.state.params)
            if(navigation.state.routeName == 'Profile')
                return { header: null }
            if(navigation.state.routeName == 'Messages')
                return { title: navigation.state.params.name}
        }
    }
);
