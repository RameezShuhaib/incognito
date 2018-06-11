import React, { Component } from 'react';
import {  View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'
import ProfileScreen from '../pages/profile';
import ChatsNavigator from './stackchatnavigation';
import ContactsScreen from '../pages/contacts';
import SettingsScreen from '../pages/settings';
import Icon from 'react-native-vector-icons/FontAwesome';

export default createBottomTabNavigator(
    {
        Profile: {
            screen: ProfileScreen,
        },  
        Chats: {
            screen: ChatsNavigator,
        },
        Contacts: {
            screen: ContactsScreen,
        },
        Settings: {
            screen: SettingsScreen,
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            let options = {
                tabBarOption: {
                  style: {
                    backgroundColor: '#3366',
                    opacity: 0.6,
                    padding: 0,
                    margin: 0,
                    borderTopWidth: 3,
                    borderTopColor: '#996600'
                    },
                },
                tabBarLabel: ({focused}) => {
                  const { routeName } = navigation.state;
                  return routeName;
                },
                tabBarIcon: ({ focused }) => {
                  const { routeName } = navigation.state;
                  let iconName;
                  switch (routeName) {
                    case 'Profile':
                      iconName = `user${focused ? '' : '-o'}`;
                      break;
                    case 'Chats':
                      iconName = `comments${focused ? '' : '-o'}`;
                      break;
                    case 'Contacts':
                      iconName = `address-book${focused ? '' : '-o'}`;
                      break;
                    case 'Settings':
                      iconName = 'gear';
                  }
                  return (
                    <Icon name={iconName} size={25} />
                  );
                },
            };
            if (navigation.state.key == 'Chats'){
                if (navigation.state.index == 1){
                    options['tabBarVisible'] = false;
                    return options;
                }
            }
            return options;
        },
        initialRouteName: "Chats",
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        // swipeEnabled: true,
    }
);
