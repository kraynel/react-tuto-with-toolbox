import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import Router from 'githubnotetaker/src/Router';
import { Badge, Page } from 'githubnotetaker/src/components'
import { Separator } from 'githubnotetaker/src/helpers'

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});


type PropsType = {
  navigator: any,
  userInfo: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired
};

@withNavigation
export default class Repositories extends Component {
  static route = {
    navigationBar: {
      title: 'Repositories',
    },
  };

  props: PropsType

  openPage(url) {
    this.props.navigator.push(Router.getRoute('web', {url}));
  }

  render() {
    const repos = this.props.repos;
    const list = repos.map((repo, index) => {
      const desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View />
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
            onPress={this.openPage.bind(this, repos[index].html_url)}
            underlayColor='transparent'
            >
              <Text style={styles.name}> {repos[index].name} </Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    })

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    )
  }
}
