import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

import Router from 'githubnotetaker/src/Router.js';
import { Page, Button } from 'githubnotetaker/src/components';
import api from 'githubnotetaker/src/utils/api';

const styles = StyleSheet.create({
  mainContainer: {
        padding: 30,
        marginTop: 60,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});

type PropsType = {
  navigator: any,
};

@withNavigation
class Home extends Component {
  static route = {
    navigationBar: {
      title: 'Home',
    },
  }

  props: PropsType;

  constructor(props){
      super(props);
      this.state = {
        username: '',
        isLoading: false,
        error: false,
      }
  }

  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit(event){
    this.setState({
      isLoading: true
    })
    api.getBio(this.state.username)
    .then((res) => {
      if(res.message === 'Not Found') {
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push(Router.getRoute('dashboard', {userInfo: res}));
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    })
  }

  render() {
    let showError = (
      this.state.error ? <Text>{ this.state.error }</Text> : <View></View>
    )
    return (
      <Page noMargin={true} noNavBar={true} backgroundColor="#48BBEC">
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Search for a Github user</Text>
          <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="white"
          >
            <Text style={styles.buttonText}> SEARCH </Text>
          </TouchableHighlight>
          <ActivityIndicator
            animating={this.state.isLoading}
            color="#111"
            size="large">
          </ActivityIndicator>
          {showError}
        </View>
      </Page>
    );
  }
}


export default Home;
