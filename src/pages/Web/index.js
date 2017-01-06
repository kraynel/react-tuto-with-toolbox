import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import { WebView } from 'react-native';

import { Page } from 'githubnotetaker/src/components'
type PropsType = {
  navigator: any,
  userInfo: PropsTypes.object.isRequired
};

@withNavigation
export default class Web extends Component {
  static route = {
    navigationBar: {
      title: 'Web View',
    },
  };

  props: PropsType

  render() {
    return (
      <Page noNavBar={true} noMargin={true} backgroundColor="#F6F6EF">
        <WebView source={{uri: this.props.url}} />
      </Page>
    )
  }
}

Web.propTypes = {
  url: PropTypes.string.isRequired
}
