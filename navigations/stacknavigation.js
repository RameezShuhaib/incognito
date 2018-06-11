import { StackNavigator } from 'react-navigation'
import NewScreen from '../pages/new';
import RootNavigator from './rootnavigation'
import VerifyScreen from '../pages/verify'
import ProfileSetupScreen from '../pages/profileSetup'
import TestScreen from '../pages/chats'

export default StackNavigator(
    {
        New: {
            screen: NewScreen,
        },
        Root: {
            screen: RootNavigator,
        },
        Verify: {
            screen: VerifyScreen,
        },
        ProfileSetup: {
            screen: ProfileSetupScreen,
        },
        Test: {
            screen: TestScreen,
        },
    },
    {
        initialRouteName: "Root",
        navigationOptions: ({ navigation }) => {
            if(navigation.state.routeName == 'Root')
                return {header:null}
        }
    }
);
