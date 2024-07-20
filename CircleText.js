import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CircleText = ({ text, value, onRed }) => {
  return (
    <View style={styles.circle} >
      <Text style={onRed === "red" ? styles.textValue : styles.redValue}>{value}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 150, 
    backgroundColor: "rgba(0, 0,0,0.5)",
    borderColor: "lightgreen",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "lightgreen",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  textValue: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  redValue: {
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
  },

  red: {
    color: "red"
  }
});

export default CircleText;
