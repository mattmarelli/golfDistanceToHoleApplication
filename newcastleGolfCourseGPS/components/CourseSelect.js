import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Router, Scene} from 'react-native'


class CourseSelect extends Component {

    render() {
      return (
        <View style={styles.container}> 
          <Text style={styles.information}>
            Welcome!
          </Text>
          <Text style={styles.information}>
            Please select the course you are playing
          </Text>
          <TouchableOpacity style={styles.courseSelect}
            onPress={() => {
              this.props.navigation.navigate('DistanceDisplay', {
                courseName: 'coalCreek'
              });
            }}>
            <Text style={styles.courseDisplay}>
              Coal Creek
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.courseSelect}
            onPress={() => {
              this.props.navigation.navigate('DistanceDisplay', {
                courseName: 'chinaCreek'
              });
            }}>
            <Text style={styles.courseDisplay}>
              China Creek
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
information: {
    alignItems: 'center',
    fontSize: 18,
},
container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
},
courseSelect: {
    marginTop: 100,
},
courseDisplay: {
    fontSize: 30
}
});


export default CourseSelect;