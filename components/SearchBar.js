import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import languages from '../data/languages';

const SearchBar = ({
  word,
  setWord,
  fetchData,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const value = useRef(new Animated.Value(0)).current;
  const [lang, setLang] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onSubmitEdit = () => {
    fetchData();
  };
  const languageHandler = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    isVisible
      ? Animated.timing(value, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start()
      : Animated.timing(value, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
  }, [isVisible]);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.left}>
            <EvilIcons name="search" size={30} color="silver" />
            <View style={styles.input}>
              <TextInput
                style={{
                  height: '100%',
                  width: '100%',
                  color: 'silver',
                  fontSize: 20,
                }}
                value={word}
                onChangeText={setWord}
                onSubmitEditing={onSubmitEdit}
                placeholder="Skriv ett ord!"
                placeholderTextColor={'silver'}
              />
              {word.length > 0 && (
                <TouchableOpacity onPress={() => setWord('')}>
                  <EvilIcons name="close" size={30} color="silver" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={languageHandler}
              style={{ justifyContent: 'flex-end' }}
            >
              <Ionicons name="ios-earth" size={30} color="silver" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: 'white' }}>{lang}</Text>
            </View>
          </View>
        </View>

        <Animated.ScrollView
          style={{
            top: 500,
            maxHeight: 650,
            alignSelf: 'stretch',
            borderRadius: 25,
            padding: 20,
            backgroundColor: 'ghostwhite',
          }}
        >
          {languages.map((language) => {
            return (
              <View
                key={language.value}
                style={{
                  borderWidth: 0.2,
                  borderRadius: 5,
                  elevation: 70,
                  borderColor: 'silver',
                  marginBottom: 4,
                  justifyContent: 'center',
                }}
              >
                <TouchableHighlight
                  style={{ height: 45, justifyContent: 'center' }}
                  onPress={() => {
                    setSelectedLanguage(language);
                    setLang(language.label);
                    setIsVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {language.label}
                  </Text>
                </TouchableHighlight>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: { alignItems: 'center' },
  input: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    fontSize: 20,
    borderLeftWidth: 0.8,
    borderLeftColor: 'silver',
    paddingLeft: 10,
    marginLeft: 10,
  },
});
export default SearchBar;
