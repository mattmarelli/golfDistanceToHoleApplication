import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import console from 'console';
import { file } from '@babel/types';

class DistanceDisplay extends Component {
        state = {
            courseName: this.props.navigation.getParam('courseName'),
            gpsData: null,
        };
        // var fileName = '../holeData/' + String(this.state.courseName) + '.csv'
    // componentDidMount() {
    //     var fileName = '../holeData/' + String(this.props.navigation.getParam('courseName')) + '.csv'
    //     var reader = new FileReader();
    //     data = reader.readAsText(fileName);
    //     console.log(data)
    // }

    render() {
        var fileName = '../holeData/' + String(this.props.navigation.getParam('courseName')) + '.csv'
        var myBlob = new Blob()
        var reader = new FileReader();
        // data = reader.readAsText(fileName);

        return (
            <View>
                <Text>
                    You selected {this.state.courseName}
                    {fileName}
                </Text>
            </View>
        )
    }
}

export default DistanceDisplay;