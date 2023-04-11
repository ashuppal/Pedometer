import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {Pedometer} from 'expo-sensors';
import CircularProgress from "react-native-circular-progress-indicator";


export default function App() {

  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");

  const [StepCount, SetStepCount] = useState(0);
  const[stepCount, setStepCount] = useState(0);

//useEffect is  used 
  useEffect(() => {
    subscribe();
  }, []);


  const subscribe = () => {
    Pedometer.watchStepCount(result => {
      SetStepCount(result.steps);
    });


    Pedometer.isAvailableAsync().then(
      result => {
        SetPedomaterAvailability(String(result));
      },
      error => {
        SetPedomaterAvailability("Could not get isAvailable: " + error);
      }
    );

  }
  
  return (
    <>
      <View style={styles.container}>
      <ImageBackground
        style = {{width: 400, height: 400}}
        resizeMode='cover'
        source={require('./assets/1.jpg')}
        >
       <View style = {{flex:1 , justifyContent: "center"}}>
          <Text 
          style = {styles.headingDesign}> 
          Count your steps: {PedomaterAvailability}
           </Text>
            <View>
              <CircularProgress
                value={StepCount}

maxValue={6500}

radius={210}

textColor={"#ecf0f1"}

activeStrokeColor={"#00BFFF"}

inActiveStrokeColor={"blue"}

inActiveStrokeOpacity={0.5}

inActiveStrokeWidth={40}

activeStrokeWidth={40}

title={"Step Count"}

titleColor={"#ecf0f1"}

titleStyle={{ fontWeight: "bold" }}


                

               />
            </View>

       </View>
    
     </ImageBackground>
    </View>
 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingDesign: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    bottom: 0,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  }
});
