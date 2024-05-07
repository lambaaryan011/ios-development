import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, TouchableOpacity, Button } from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      props.onFadeInComplete(); // Callback to notify parent component that fade-in is complete
    });
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
        transform: [{ rotate: props.rotateValue }],
      }}>
      {props.children}
    </Animated.View>
  );
};

const SlideInView = props => {
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial value for slide: -100

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500, // Adjust the duration for the slide animation
      delay: props.delay || 0, // Apply delay if provided
      useNativeDriver: true,
    }).start();
  }, [slideAnim, props.delay]);

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateX: slideAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default () => {
  const [rotateAnim] = useState(new Animated.Value(0));
  const [showButton, setShowButton] = useState(false);
  const [showSlideInList, setShowSlideInList] = useState(false);

  const startRotateAnimation = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleFadeInComplete = () => {
    setShowButton(true); // Show the button after fade-in animation completes
  };

  const handleButtonClick = () => {
    setShowSlideInList(true); // Show the SlideInList component after button click
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={startRotateAnimation}>
        <FadeInView
          style={{
            width: 250,
            height: 50,
            backgroundColor: 'powderblue',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          rotateValue={rotateInterpolate}
          onFadeInComplete={handleFadeInComplete}>
          <Text style={{ fontSize: 28, textAlign: 'center'}}>
            Fading in
          </Text>
        </FadeInView>
      </TouchableOpacity>
      {showButton && (
        <Button
          title="Click Me"
          onPress={handleButtonClick}
        />
      )}
      {showSlideInList && (
        <SlideInList items={['Item 1', 'Item 2', 'Item 3']} />
      )}
    </View>
  );
};

const SlideInList = ({ items }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {items.map((item, index) => (
        <SlideInView
          key={index}
          style={{
            width: 250,
            height: 50,
            backgroundColor: 'powderblue',
            marginBottom: 5, // Reduce margin bottom for items
          }}
          delay={index * 200} // Adjust the delay for each item
        >
          <Text style={{ fontSize: 28, textAlign: 'center' }}>
            {item}
          </Text>
        </SlideInView>
      ))}
    </View>
  );
};

