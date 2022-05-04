import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import languages from './data/languages';

export default function App() {
  const [word, setWord] = useState();
  const [translations, setTranslations] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: '',
    value: '',
  });

  const [modal, setModal] = useState('none');
  const fetchData = async () => {
    const response = await fetch(
      `http://lexin.nada.kth.se/lexin/service?searchinfo=both,swe_${selectedLanguage?.value},${word}&output=JSON`
    );
    const data = await response.json();
    setTranslations(data.Result);
  };

  const onSubmitEdit = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [selectedLanguage]);
  return (
    <View style={styles.container}>
      <View>
        <TouchableHighlight onPress={() => setModal('flex')}>
          <View
            style={{
              borderTopWidth: 0.3,
              borderBottomWidth: 0.3,
              marginBottom: 5,
              paddingVertical: 15,
              width: '90%',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor: 'floralwhite',
            }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {selectedLanguage.label || 'Välj Språk'}{' '}
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            display: `${modal}`,
            width: '90%',
            alignSelf: 'center',
            height: '70%',
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={word}
          onChangeText={setWord}
          onSubmitEditing={onSubmitEdit}
        />
      </View>
      <ScrollView style={styles.translateContainer}>
        {translations?.map((translation) => {
          const { Value, Type, BaseLang, TargetLang } = translation;
          return (
            <View key={translation.VariantID} style={{ marginBottom: 80 }}>
              <Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {Value}{' '}
                </Text>{' '}
                [{BaseLang?.Phonetic?.Content}] {Type}
              </Text>
              <Text>
                {'\uff1c'}
                {BaseLang?.Inflection?.map((inflection, index) => (
                  <Text key={index}>{inflection?.Content}, </Text>
                ))}
                {'\uff1e'}
              </Text>
              <View style={{ marginLeft: 10, fontSize: 20 }}>
                <Text>{BaseLang?.Meaning}</Text>
                <Text>
                  {'\uff1c'}
                  {BaseLang?.Graminfo}
                  {'\uff1e'}
                </Text>

                {BaseLang?.Comment && <Text>{BaseLang?.Comment}</Text>}

                <Text style={{ fontWeight: 'bold' }}>
                  {TargetLang?.Translation} {TargetLang?.Comment}
                </Text>
                {BaseLang?.Example && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>
                      Example:
                    </Text>
                    {BaseLang?.Example?.map((example) => (
                      <Text
                        style={{
                          marginLeft: 15,
                          marginBottom: 5,
                        }}
                        key={example.ID}
                      >
                        {'\u25CF'} {example.Content}
                      </Text>
                    ))}
                  </View>
                )}

                {BaseLang?.Idiom && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>Uttryck:</Text>
                    {BaseLang.Idiom.map((idiom) => (
                      <Text
                        style={{ marginLeft: 15, marginVertical: 10 }}
                        key={idiom.ID}
                      >
                        {'\u2023'} {idiom.Content} -{' '}
                        {TargetLang?.Idiom?.map((idiom) => idiom.Content)}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#174367',
    height: '100%',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 35,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    fontSize: 20,
    color: 'darkslategrey',
  },
  translateContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 50,
    marginTop: 50,
    padding: 20,
  },
  logo: {
    width: 25,
    height: 25,
  },
  languageItem: {
    flexDirection: 'row',
  },
});
