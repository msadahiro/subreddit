import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import NavigationExperimental from 'react-native-deprecated-custom-components';

import HeaderBar from './app/components/HeaderBar/HeaderBar'
import Posts from './app/components/Posts/Posts';
import PostDetails from './app/components/PostDetails/PostDetails'

export default class subreddits extends Component {
  renderScene(route, navigator) {
    switch (route.id) {
      case 'posts':
        return (
          <View style={styles.container}>
            <HeaderBar />
            <Posts
              navigator={navigator}
              title="posts"
            />
          </View>
        )
      case 'details':
        return (
          <View style={styles.container}>
            <HeaderBar />
            <PostDetails
              navigator={navigator}
              post={route.post}
              title="details"
            />
          </View>
        )
    }
  }
  render() {
    return (
      <NavigationExperimental.Navigator
        initialRoute={{ id: 'posts' }}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => NavigationExperimental.Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

AppRegistry.registerComponent('subreddits', () => subreddits);
