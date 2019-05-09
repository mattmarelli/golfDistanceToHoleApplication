/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import CourseSelect from './components/CourseSelect'
import DistanceDisplay from './components/DistanceDisplay'

import {createStackNavigator, createAppContainer} from 'react-navigation'

const AppStackNavigator = createStackNavigator ({
  Home: {screen: CourseSelect},
  DistanceDisplay: {screen: DistanceDisplay}
});

const App = createAppContainer(AppStackNavigator);

export default App 

