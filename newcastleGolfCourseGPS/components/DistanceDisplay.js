import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import console from 'console';
import { file } from '@babel/types';

class DistanceDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentHole: 1,
            courseName: this.props.navigation.getParam('courseName'),
            gpsData: null,
            distanceToFront: 1,
            distanceToMiddle: 1,
            distanceToBack: 1,
        }
        this.updateDistance = this.updateDistance.bind(this);
    }

    // var fileName = '../holeData/' + String(this.state.courseName) + '.csv'
    // componentDidMount() {
    //     var fileName = '../holeData/' + String(this.props.navigation.getParam('courseName')) + '.csv'
    //     var reader = new FileReader();
    //     data = reader.readAsText(fileName);
    //     console.log(data)
    // }

    // method is not correct need to change once I get the gps locations and hole locations
    updateDistance(currentHole, nextUse) {
        this.setState({
            distanceToBack: currentHole + nextUse,
            distanceToFront: currentHole + nextUse,
            distanceToMiddle: currentHole + nextUse,
        })
    }

    
    render() {
        var fileName = '../holeData/' + String(this.props.navigation.getParam('courseName')) + '.csv'
        var myBlob = new Blob()
        var reader = new FileReader();
        // data = reader.readAsText(fileName);

        return (
            <View>
                <Text>
                    Hole {this.state.currentHole}
                </Text>
                <Text>
                    You selected {this.state.courseName} 
                    distance to front {this.state.distanceToFront} 
                    distance to middle {this.state.distanceToMiddle} 
                    distance to back {this.state.distanceToBack}
                </Text>
                <TouchableOpacity
                    onPress={()=>{
                            if (this.state.currentHole < 18) {
                                this.setState({
                                    currentHole: this.state.currentHole + 1
                                });
                                this.updateDistance(this.state.currentHole, 1);
                            }
                        }}>
                    <Text>
                        Next Hole
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                            if (this.state.currentHole > 1) {
                                this.setState({
                                    currentHole: this.state.currentHole - 1
                                });
                                this.updateDistance(this.state.currentHole, -1);
                            }
                        }}>
                    <Text>
                        Previous Hole
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DistanceDisplay;