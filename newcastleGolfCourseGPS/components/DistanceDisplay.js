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
        this.calculateDistance = this.calculateDistance.bind(this);
        this.deg2rad = this.deg2rad.bind(this);
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

    deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    calculateDistance(greenLocation) {
        var lat1 = this.state.where.lat
        var lon1 = this.state.where.long
        if (greenLocation.length == 23) {
            var lat2 = Number(greenLocation.substring(1,10))
            var lon2 = Number(greenLocation.substring(11,22))
        } else {
            var lat2 = Number(greenLocation.substring(2,11))
            var lon2 = Number(greenLocation.substring(12,23))
        }

        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d * 1093.6133;  //Distance in yards being returned
    }
    // method is not correct need to change once I get the gps locations and hole locations
    updateDistance(currentHole, nextUse) {

        var holeData1 = data.courseInformation
        var holeInformation = holeData1[this.state.courseName]
        holeInformation = holeInformation[currentHole + nextUse]
        var splitData = holeInformation.split('+')
        var frontLocation = splitData[0]
        var middleLocation = splitData[1]
        var backLocation = splitData[2]
        var distanceToFrontGreen = this.calculateDistance(frontLocation)
        var distanceToMiddleGreen = this.calculateDistance(middleLocation)
        var distanceToBackGreen = this.calculateDistance(backLocation)
        this.setState({
            holeData: holeInformation, 
            distanceToFront: distanceToFrontGreen,
            distanceToMiddle: distanceToMiddleGreen,
            distanceToBack: distanceToBackGreen,
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