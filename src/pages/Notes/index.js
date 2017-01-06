import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

import api from 'githubnotetaker/src/utils/api'
import { Badge, Page } from 'githubnotetaker/src/components'
import { Separator } from 'githubnotetaker/src/helpers'

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noteInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowView: {
    flexGrow: 1
  }
});

type PropsType = {
  navigator: any,
};

@withNavigation
export default class Notes extends Component {
  static route = {
    navigationBar: {
      title: 'Notes',
    },
  };

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit(e) {
    const note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(this.props.userInfo.login, note)
      .then(() => api.getNotes(this.props.userInfo.login))
      .then((data) => {
        console.log('NEW DATA', data)
        this.setState({
          dataSource: this.ds.cloneWithRows(data)
        })
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error});
      })
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.noteInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowView}>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
        <Separator />
      </View>
    )
  }

  render() {
    return (
      <Page noMargin={true} noNavBar={true}>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo} />}
        />
        {this.footer()}
      </Page>
    )
  }
}

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
}
