import React, { useState } from "react";
import { Animated } from "react-native";

export interface Props {
    style: any;
    children: any;
    duration?: number;
}

export const FadeInView = (props: Props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: props.duration || 10000,
        }
      ).start();
    }, [])
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

export default FadeInView;