import React from "react";
import { StyleSheet, Text, View, StyleSheet } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Components{
    constructor(){
        super()
        this.state={
            hasCameraPermissions: null,
            scan:false,
             scanData: '',
             buttonState: 'normal',
                }
    }
    render(){
        const cameraPermissions=this.state.hasCameraPermissions
        const scan= this.state.scan
        const buttonState= this.state.buttonState
        if(buttonState === 'click' && cameraPermissions === true){
          return(
            <BarCodeScanner onBarCodeScanned={scan? undefined: this.handleBarCode}
            style={StyleSheet.absoluteFillObject}/>
          )
        }
        else if(buttonState === 'normal'){
        return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text>
            {cameraPermissions === true ? this.state.scanData : 'request cameraPermissions'}
           </Text>
           <TouchableOpacity 
           style={styles.buttonStyle}
           onPress={()=>{
             this.getCameraPermissions()
           }}
           title = "Bar Code Scanner">
            <Text style={styles.textStyle}>Scan QR Code</Text>
           </TouchableOpacity>
          </View>
        )
        }
      }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
          hasCameraPermissions: status === 'granted',
          buttonState: 'click'
        })
       }
     
       handleBarCode=async({type,data})=>{
        this.setState({
          scan: true,
          scanData: data,
          buttonState: 'normal'
        })
       }
}

const styles= StyleSheet.create({
    textStyle: {
     fontSize: 20,
     fontWeight: 'bold',
    },
    buttonStyle: {
     backgroundColor: 'orange',
     marginTop: 30,
     weidth: 30
    }
  })