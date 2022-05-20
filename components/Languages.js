import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import languages from '../data/languages';

const Languages = ({
  selectedLanguage,
  setSelectedLanguage,
  languageHandler,
}) => {
  const [modal, setModal] = useState('none');

  return (
    <View>
      <ScrollView>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.value}
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 10,
              borderColor: 'dimgrey',
            }}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              setSelectedLanguage(language);
              languageHandler();
            }}
          >
            <Text style={{ fontSize: 20 }}>{language.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Languages;
