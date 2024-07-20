import React from "react"
import { View, Text } from "react-native"
import { Circle, Defs, LinearGradient, Stop, Svg } from "react-native-svg";

const LiquidGauge = ({ percentage, onRed }) => {
  const radius = 80
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
    
      <Svg width={radius * 2} height={radius * 2}>
     
        <Defs>
          <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="1">
            <Stop offset="0" stopColor={onRed} />
            <Stop offset="1" stopColor={onRed} />
            
            
          </LinearGradient>
        
        </Defs>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="rgba(0, 0,0,0.5)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          
      >
      
      </Circle>
   
      </Svg>
      <Text style={{  fontSize: 25,
          
          color: "#323232",
          fontWeight: "bold", fontSize: 15}}>Water Percentage: {percentage}%</Text>
    </View>
  )
}

export default LiquidGauge
