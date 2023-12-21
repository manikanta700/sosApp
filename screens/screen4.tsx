import * as React from 'react';

import { StyleSheet, View, Text, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import { SendDirectSms } from 'react-native-send-direct-sms';

import GetLocation from 'react-native-get-location'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function App() {
  const [mobileNumber, setMobileNumber] = React.useState('9866395959');
  const [bodySMS, setBodySMS] = React.useState("-");
  const [loading, setLoading] = React.useState(true);
  function sendSmsData(mobileNumber: string, bodySMS: string) {
    SendDirectSms(mobileNumber, bodySMS)
      .then((res: any) => console.log('then', res))
      .catch((err: any) => console.log('catch', err));
  }

  React.useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(location => {
        console.log(location);
        let sms = `latitude : ${location.latitude}, longitude : ${location.longitude}`;
        setBodySMS(sms);
        console.log("*",sms)
        setLoading(false)
    })
    .catch(error => {
        const { code, message } = error;
        console.log(code, message);
    })
    
  }, []);
  if(loading){
    return (
     <View style={{flex:1,justifyContent:'center',backgroundColor:'#c0c9bd'}}>
      <ActivityIndicator size="large" color="#00ff00" />

     </View>
    )
  }

  return (
    <View style={styles.container}>
      {/*<Text>Result: {result}</Text>*/}
      {/* <Text style={styles.titleTextsmall}>
        Enter Recipients Number
      </Text>
      <TextInput
        value={mobileNumber}
        onChangeText={
          (mobileNumber) => setMobileNumber(mobileNumber)
        }
        placeholder={'Enter Mobile Number'}
        keyboardType='numeric'
        style={styles.textInput}
      />
      <Text style={styles.titleTextsmall}>
        Enter SMS Body
      </Text>
      <TextInput
        value={bodySMS}
        onChangeText={(bodySMS) => setBodySMS(bodySMS)}
        placeholder={'Enter SMS body'}
        style={styles.textInput}
      /> */}
      <TouchableOpacity  onPress={() => sendSmsData(mobileNumber, bodySMS)}>
      <View style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              borderWidth: 3,
              borderColor: 'black',
              borderStyle: 'solid',
              backgroundColor:'red',
              justifyContent: 'center'}}>
    <Text style={{fontSize: 35,textAlign: 'center',color:'black'}}>SOS</Text></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor:'#c0c9bd'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  sendButtonLabel: {
    fontSize: 16,
    color: '#FFFFFF',

  },
  // sendButton: {
  //   width: '100%',
  //   backgroundColor: '#22C674',
  //   borderRadius: 4,
  //   opacity: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingVertical: 10,
  //   marginTop: 30,
  // },
  titleTextsmall: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  textInput: {
    paddingLeft: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#3F44511F',
    borderRadius: 4,
    height: 44,
    color: '#000000',
    opacity: 0.75,
    width: '100%',
  },
});

