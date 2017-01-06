import React, { Component, PropTypes } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

import { Badge } from 'githubnotetaker/src/components'
import { Separator } from 'githubnotetaker/src/helpers'

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

@withNavigation
export default class Profile extends Component {
  static route = {
    navigationBar: {
      title({ userInfo }) { return userInfo.login; },
    },
  };

  getRowTitle(userInfo, item) {
    item = (item === 'public_repos') ? 'Public repos' : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    const userInfo = this.props.userInfo;
    const topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos']
    const list = topicArr.map((item, index) => {
      if(!userInfo[item]) {
        return <View key={index}></View>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContext}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        )

      }
    })
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    )
  }
}

Profile.propType = {
  userInfo: PropTypes.object.isRequired
};
