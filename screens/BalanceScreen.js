import React, { Component } from "react";
import {Text, View, FlatList} from "react-native";
import {List, ListItem} from "react-native-elements";
import firebase from 'firebase';

class BalanceScreen extends Component {
  static navigationOptions = {
    title: 'New Feeds',
    header: null
  }

  constructor(props){
    super(props)
    this.state = {
        data: []
    }
  }

  componentDidMount(){
    const database = firebase.database().ref('/users')
    database.on('value', snap =>{
      snap.forEach(element => {
         this.setState({ data : [ ...this.state.data, element.val().userDetails] })
      });
    })
  }

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0}}>
      <FlatList
        data = {this.state.data}
        renderItem={
          ({item}) => (
          <ListItem
          roundAvatar
          title={`${item.displayName}`}
          subtitle={item.email}
          containerStyle={{borderBottomWidth:0}}
          />
        )}
        keyExtractor={item => item.email}
      />
      </List>
    )  
  }
}
export default BalanceScreen;