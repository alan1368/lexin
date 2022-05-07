import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import languages from '../data/languages';

const Languages = ({ selectedLanguage, setSelectedLanguage }) => {
  const [modal, setModal] = useState('none');

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          modal === 'none' ? setModal('flex') : setModal('none');
        }}
        activeOpacity={0.6}
        underlayColor="floralwhite"
        style={{
          borderWidth: 0.3,
          marginBottom: 5,
          borderRadius: 6,
          paddingVertical: 15,
          width: '90%',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: 'floralwhite',
        }}
      >
        <View>
          <Text style={{ color: 'white', fontSize: 20 }}>
            {selectedLanguage.label || 'Välj Språk'}{' '}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: `${modal}`,
          width: '90%',
          alignSelf: 'center',
          height: 300,
          marginBottom: 20,
          backgroundColor: 'white',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <ScrollView>
          {languages.map((language) => (
            <TouchableHighlight
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
                setModal('none');
              }}
            >
              <Text style={{ fontSize: 20 }}>{language.label}</Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Languages;
