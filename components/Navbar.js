import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
const Navbar = () => {
  return (
    <View
      style={{
        backgroundColor: '#174367',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
      }}
    >
      <Ionicons name="ios-earth" size={30} color="white" />
    </View>
  );
};

export default Navbar;
