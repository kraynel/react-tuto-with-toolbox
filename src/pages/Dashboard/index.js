import React, { Component, PropsTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

import Router from 'githubnotetaker/src/Router';
import { Page } from 'githubnotetaker/src/components';
import api from 'githubnotetaker/src/utils/api'

var styles = StyleSheet.create({
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

type PropsType = {
  navigator: any,
  userInfo: PropsTypes.object.isRequired
};

@withNavigation
class Dashboard extends Component {
  static route = {
    navigationBar: {
      title: 'Dashboard',
    },
  };
  props: PropsType;

  makeBackground(button) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(button === 0) {
      obj.backgroundColor = '#48BBEC'
    } else if (button === 1) {
      obj.backgroundColor = '#E77AAE'
    } else {
      obj.backgroundColor = '#758EF4'
    }

    return obj;
  }

  goToProfile() {
    this.props.navigator.push(Router.getRoute('profile', {
      userInfo: this.props.userInfo
    }));
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login)
      .then((repos) => {
        this.props.navigator.push(Router.getRoute('repositories', {
          userInfo: this.props.userInfo,
          repos: repos
        }));
      })
  }

  goToNotes() {
    api.getNotes(this.props.userInfo.login)
      .then((notes) => {
        notes = notes || {}
        this.props.navigator.push(Router.getRoute('notes', {
          userInfo: this.props.userInfo,
          notes: notes
        }));
      })
  }

  render(){
    return (
      <Page noMargin={true} noNavBar={true}>
        <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}} />
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </Page>
    )
  }
 }

export default Dashboard;
