import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class componentName extends Component {
  render() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    header:{
      flexDirection: 'row',
      height: 65,
      borderBottomColor: "rgb(213, 213, 213)",
      borderBottomWidth: 0.5,
      justifyContent: 'center',
    },
    headerTitle:{
      top: 30,
      fontSize: 18,
      fontWeight: "bold",
      color: "rgb(55, 55, 55)",
    },
});