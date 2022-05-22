import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Sound,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const TranslationSvenska = ({ translations }) => {
  return (
    <ScrollView style={styles.container}>
      {translations?.map((translation, index) => {
        const { Value, Type, Phonetic, Inflection, Lexeme, VariantID } =
          translation;
        return (
          <View key={VariantID} style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.title}>{Value}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <Text style={{ color: 'dodgerblue', marginRight: 5 }}>
                  [{Phonetic?.map((phon) => phon?.Content)}]
                </Text> */}
                <TouchableHighlight>
                  <AntDesign name="sound" size={20} color="dodgerblue" />
                </TouchableHighlight>
              </View>
            </View>
            <View
              style={{
                width: 70,
                height: 30,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: 'dodgerblue',
              }}
            >
              <Text style={{ color: 'ghostwhite' }}>{Type}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              {Type === ('pron.' || 'adv.' || 'adj.' || 'interj.') &&
                Inflection?.map((inflection, index) => (
                  <Text style={{ marginBottom: 5, marginLeft: 10 }} key={index}>
                    {inflection?.Content}
                  </Text>
                ))}
            </View>
            <View style={{ flexDirection: 'column' }}>
              {Type === 'subst.' &&
                Inflection?.map((inflection, index) => (
                  <Text style={{ marginBottom: 5, marginLeft: 10 }} key={index}>
                    {index == 0 && <Text>Singular Bestämd Form </Text>}
                    {index == 1 && <Text>Plural Obestämd Form </Text>}
                    {index == 2 && <Text>Plural Bestämd Form </Text>}
                    {' |  '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {inflection?.Content}
                    </Text>
                  </Text>
                ))}
            </View>
            <View style={{ flexDirection: 'column' }}>
              {Type === 'verb' &&
                Inflection?.map((inflection, index) => (
                  <Text key={index} style={{ marginBottom: 5, marginLeft: 10 }}>
                    {index == 0 && <Text>preteritum </Text>}
                    {index == 1 && <Text>supinum </Text>}
                    {index == 2 && <Text>infinitiv </Text>}

                    <Text style={{ fontWeight: 'bold' }}>
                      {inflection?.Content}
                    </Text>
                    {'  |  '}
                  </Text>
                ))}
            </View>

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginVertical: 10,
                  color: 'dodgerblue',
                }}
              >
                Definition
              </Text>
              <Text style={{ marginLeft: 10 }}>
                {Lexeme && Lexeme[0]?.Definition?.Content}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginVertical: 10,
                  color: 'dodgerblue',
                }}
              >
                Compound
              </Text>
              <View style={{ flexDirection: 'column' }}>
                {Lexeme &&
                  Lexeme[0]?.Compound?.map((compound) => (
                    <Text key={compound?.ID} style={{ marginLeft: 10 }}>
                      {compound?.Content}
                    </Text>
                  ))}
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginVertical: 10,
                  color: 'dodgerblue',
                }}
              >
                Exempel
              </Text>
              <View style={{ marginLeft: 10 }}>
                {Lexeme &&
                  Lexeme[0]?.Example?.map((example) => (
                    <Text key={example?.ID}>{example?.Content}</Text>
                  ))}
              </View>
            </View>
            {Lexeme && Lexeme[0]?.Idioms && (
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginVertical: 10,
                    color: 'dodgerblue',
                  }}
                >
                  Uttryck
                </Text>
                <View style={{ marginLeft: 10 }}>
                  {Lexeme &&
                    Lexeme[0]?.Idioms?.map((idiom) => (
                      <Text key={idiom?.ID}>{idiom?.Content}</Text>
                    ))}
                </View>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 20,
    flex: 1,
  },
  item: {
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    marginRight: 10,
  },
});

export default TranslationSvenska;
