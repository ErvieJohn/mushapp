import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  Pressable,
  Switch
} from "react-native";
import CircleText from "./CircleText";
import LiquidGauge from "./LiquidGauge";
import { db, ref, onValue, set } from "./firebase";
import bg from "./assets/bg2.png";
import { Svg, Path } from "react-native-svg";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [water, setWater] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [temp, setTemp] = useState(0);
  const [highTemp, setHighTemp] = useState(0);
  const [lowTemp, setLowTemp] = useState(0);
  const [higHumid, setHighHumid] = useState(0);
  const [lowHumid, setLowHumid] = useState(0);
  const [highCo2, setHighCo2] = useState(0);
  const [lowCo2, setLowCo2] = useState(0);
  const [co2, setCo2] = useState(0);

  // FAN
  const [isFanEnable, setIsFanEnable] = useState(false);
  const toggleFanSwitch = () => {
    set(ref(db, 'fan'), !isFanEnable);
    setIsFanEnable(!isFanEnable);
  };

  // HEATER
  const [isHeaterEnable, setIsHeaterEnable] = useState(false);
  const toggleHeaterSwitch = () => {
    set(ref(db, 'heater'), !isHeaterEnable);
    setIsHeaterEnable(!isHeaterEnable);
  };

  // FAN2
  const [isFan2Enable, setIsFan2Enable] = useState(false);
  const toggleFan2Switch = () => {
    set(ref(db, 'fan2'), !isFan2Enable);
    setIsFan2Enable(!isFan2Enable);
  };

  // HUMIDIFIER
  const [isHumidifierEnable, setIsHumidifierEnable] = useState(false);
  const toggleHumidifierSwitch = () => {
    set(ref(db, 'humidifier'), !isHumidifierEnable);
    setIsHumidifierEnable(!isHumidifierEnable);
  };

  // WATER PUMP
  const [isWaterPumpEnable, setIsWaterPumpEnable] = useState(false);
  const toggleWaterPumpSwitch = () => {
    set(ref(db, 'waterPump'), !isWaterPumpEnable);
    setIsWaterPumpEnable(!isWaterPumpEnable);
  };

  // Automatic and Manual
  const [isAutomaticEnable, setIsAutomaticEnable] = useState(false);
  const toggleAutomaticSwitch = () => {
    set(ref(db, 'auto'), !isAutomaticEnable);
    setIsAutomaticEnable(!isAutomaticEnable);

    set(ref(db, 'fan'), false);
    setIsFanEnable(false);

    set(ref(db, 'heater'), false);
    setIsHeaterEnable(false);

    set(ref(db, 'fan2'), false);
    setIsFan2Enable(false);

    set(ref(db, 'humidifier'), false);
    setIsHumidifierEnable(false);

    set(ref(db, 'waterPump'), false);
    setIsWaterPumpEnable(false);
  };

  useEffect(() => {
    const data = ref(db);

    onValue(data, (snapshot) => {
      setTemp(snapshot.val().temp);
      setHumidity(snapshot.val().humid);
      setWater(Math.round(snapshot.val().water));
      setCo2(snapshot.val().co2);

      // FAN
      setIsFanEnable(snapshot.val().fan);

      // HEATER
      setIsHeaterEnable(snapshot.val().heater);

      // FAN2
      setIsFan2Enable(snapshot.val().fan2);

      // HUMIDIFIER
      setIsHumidifierEnable(snapshot.val().humidifier);

      // WATER PUMP
      setIsWaterPumpEnable(snapshot.val().waterPump);

      // Automatic
      setIsAutomaticEnable(snapshot.val().auto);

      setLowTemp(val => {
        if (snapshot.val().temp < val || val === 0) {
          return snapshot.val().temp;
        }
        return val;
      });
  
      setHighTemp(val => {
        if (snapshot.val().temp > val || val === 0) {
          return snapshot.val().temp;
        }
        return val;
      });

      setLowHumid(val => {
        if (snapshot.val().humid < val || val === 0) {
          return snapshot.val().humid;
        }
        return val;
      });
  
      setHighHumid(val => {
        if (snapshot.val().humid > val || val === 0) {
          return snapshot.val().humid;
        }
        return val;
      });

      setLowCo2(val => {
        if (snapshot.val().co2 < val || val === 0) {
          return snapshot.val().co2;
        }
        return val;
      });
  
      setHighCo2(val => {
        if (snapshot.val().co2 > val || val === 0) {
          return snapshot.val().co2;
        }
        return val;
      });
    });

    
  }, [db]);

  // useEffect(()=> {
  //   if(water >= 13){
  //     setModalVisible(true)
  //   }else{
  //     setModalVisible(false)
  //   }
  // }, [water])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  
      }}
    >
      <ImageBackground source={bg} resizeMode="stretch" style={styles.img}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignContent: "center",
            // marginTop: 20,
            backgroundColor: "green",
            // marginBottom: 5,
            width: screenWidth
          }}
        >
             <Image
            resizeMode="contain"
            style={{
              marginLeft: 10,
              width: 40,
              height: 40,
            }}
            source={require("./assets/mushroom.png")}/>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white",
              letterSpacing: 5

            }}
          >
            MushApp
          </Text>

          <Image
            resizeMode="contain"
            style={{
              marginLeft: 10,
              width: 40,
              height: 40,
            }}
            source={require("./assets/mushroom.png")}
          />
        </View>

        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>WARNING</Text>
            <Text style={styles.modalText}>Low Water Percentage, Please fill up the water tank!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}

        <View>
          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 5}}>Parameters</Text>
        </View>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Text>Temperature Range: </Text>

          <Text style={{ color: "black", fontWeight: "bold" }}>
            20°C - 30°C
          </Text>
        </View>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Text>Humidity Range: </Text>

          <Text style={{ color: "black", fontWeight: "bold" }}>
            70% - 85%
          </Text>
        </View>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <Text>CO2 Range: </Text>

          <Text style={{ color: "black", fontWeight: "bold" }}>
            400PPM - 1000PPM
          </Text>
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 1}}>Controls</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{flexDirection: "row", marginRight: "10%"}}>
              <Text style={{fontSize: 16}}>Automatic: </Text>
              <Text style={{ color: isAutomaticEnable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
                {isAutomaticEnable ? "ON" : "OFF"}
              </Text>
            </View>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isAutomaticEnable ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAutomaticSwitch}
              value={isAutomaticEnable}
            />
          </View>

        <View style={{flexDirection: "row", maxWidth: 300, minWidth: 300, display: isAutomaticEnable ? "none" : "flex"}}>
          {/* Controls view */}
          <View style={{flexDirection: "column", maxWidth: 150, minWidth: 150}}>
            {/* FAN */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{flexDirection: "row", marginRight: "10%"}}>
                <Text style={{fontSize: 16}}>Fan: </Text>
                <Text style={{ color: isFanEnable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
                  {isFanEnable ? "ON" : "OFF"}
                </Text>
              </View>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isFanEnable ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleFanSwitch}
                value={isFanEnable}
                disabled={isAutomaticEnable}
              />
            </View>

            {/* HEATER */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{flexDirection: "row", marginRight: "10%"}}>
                <Text style={{fontSize: 16}}>Heater: </Text>
                <Text style={{ color: isHeaterEnable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
                  {isHeaterEnable ? "ON" : "OFF"}
                </Text>
              </View>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isHeaterEnable ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleHeaterSwitch}
                value={isHeaterEnable}
                disabled={isAutomaticEnable}
              />
            </View>
          </View>

          <View style={{flexDirection: "column", maxWidth: 150, minWidth: 150}}>
            {/* FAN2 */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{flexDirection: "row", marginRight: "10%"}}>
                <Text style={{fontSize: 16}}>Fan2: </Text>
                <Text style={{ color: isFan2Enable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
                  {isFan2Enable ? "ON" : "OFF"}
                </Text>
              </View>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isFan2Enable ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleFan2Switch}
                value={isFan2Enable}
                disabled={isAutomaticEnable}
              />
            </View>

            {/* Humidifier */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{flexDirection: "row", marginRight: "10%"}}>
                <Text style={{fontSize: 16}}>Humidifier: </Text>
                <Text style={{ color: isHumidifierEnable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
                  {isHumidifierEnable ? "ON" : "OFF"}
                </Text>
              </View>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isHumidifierEnable ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleHumidifierSwitch}
                value={isHumidifierEnable}
                disabled={isAutomaticEnable}
              />
            </View>
          </View>

          
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", display: isAutomaticEnable ? "none" : "flex"}}>
          <View style={{flexDirection: "row", marginRight: "3%"}}>
            <Text style={{fontSize: 16}}>Water Pump: </Text>
            <Text style={{ color: isWaterPumpEnable ? "blue" : "black", fontWeight: "bold", fontSize: 16}}>
              {isWaterPumpEnable ? "ON" : "OFF"}
            </Text>
          </View>

          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isWaterPumpEnable ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleWaterPumpSwitch}
            value={isWaterPumpEnable}
            disabled={isAutomaticEnable}
          />
        </View>
        
        

        <View
          style={{
            flex: 2,
            flexDirection: "row",
          }}
        >
          <CircleText text="Temperature" value={temp+"°C"} onRed={temp < 20 || temp > 30 ? "red" : ""}/>
          <CircleText text="Humidity" value={humidity+"%"} onRed={humidity < 70 || humidity > 85 ? "red" : ""} />
          
        </View>
        <CircleText text="CO2" value={co2+" PPM"} onRed={co2 < 400 || co2 > 1000 ? "red" : ""}  />
          
        
        <View
          style={{
            flex: 2,
            flexDirection: "row",
          }}
        >
        
        <LiquidGauge percentage={water > 1 && water <= 19 ? Math.round(water / 19 * 100) : 0} onRed={water < 6 || water > 14 ? "red" : "#0099ff"}/>
        <CircleText text="Water Level" value={water > 1 && water <= 19 ? water : 0}  onRed={water < 6 || water > 12 ? "red" : ""} />
          

        </View>
       
        <View
          style={{
            flex: 1,

            flexDirection: "row",
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 600"
            height="150"
            width={screenWidth}
          >
            <Path
              fill="lightgreen"
              fill-opacity="1"
              d="M0,192L34.3,197.3C68.6,203,137,213,206,213.3C274.3,213,343,203,411,192C480,181,549,171,617,192C685.7,213,754,267,823,277.3C891.4,288,960,256,1029,213.3C1097.1,171,1166,117,1234,117.3C1302.9,117,1371,171,1406,197.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></Path>
          </Svg>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  img: {
    height: screenHeight + 30,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 50
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,

  },
});

export default App;