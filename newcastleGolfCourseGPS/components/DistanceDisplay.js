import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import console from 'console';
import data from '../holeData/allCourses.json'
// import * as RNFS from 'react-native-fs'

class DistanceDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentHole: 1,
            courseName: this.props.navigation.getParam('courseName'),
            distanceToFront: 0,
            distanceToMiddle: 0,
            distanceToBack: 0,
            where: {lat:null, long:null},
            error: null,
            holeData: null,  // remove later
        }
        this.updateDistance = this.updateDistance.bind(this);
        this.geoSucess = this.geoSucess.bind(this);
        this.geoFailure = this.geoFailure.bind(this);
    }

    componentWillMount() {
        // var filePath = '../holeData/' + String(this.state.courseName) + '.csv'
        // var reader = new FileReader()
        // reader.readAsText(filePath)
        // RNFS.readFile(filePath, 'utf-8')
        // console.log(filePath)
    }

    componentDidMount() {
        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            distanceFilter: 0,
        };
        this.setState({error: null})
        navigator.geolocation.getCurrentPosition(this.geoSucess, this.geoFailure, geoOptions)
        this.watchID = navigator.geolocation.watchPosition(this.geoSucess, this.geoFailure, geoOptions)
        this.updateDistance(1, 0)
        // var filePath = '../holeData/' + String(this.state.courseName) + '.json'
        // var data = require('../holeData/' + String(this.state.courseName) + '.json')
        
        // reader.readAsText(blob)
    }

    geoSucess = (position) => {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        this.setState({
            error: null,
            where: {lat: latitude, long: longitude}
        });
        var currentHole = this.state.currentHole

    }

    geoFailure = (err) => {
        this.setState({error: err.message})
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    // method is not correct need to change once I get the gps locations and hole locations
    updateDistance(currentHole, nextUse) {

        holeData1 = data.courseInformation
        holeInformation = holeData1[this.state.courseName]
        holeInformation = holeInformation[currentHole + nextUse]
        this.setState({
            holeData: holeInformation, 
            distanceToBack: currentHole + nextUse,
            distanceToFront: currentHole + nextUse,
            distanceToMiddle: currentHole + nextUse,
        })
    }

    
    render() {
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
                    latitude: {this.state.where.lat}
                    longitude: {this.state.where.long}
                    holeData: {this.state.holeData}
                </Text>
                {
                    this.state.error && (
                        <Text>
                            {this.state.error}
                        </Text>
                    )
                }
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