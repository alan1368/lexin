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

const TranslationOther = ({ translations }) => {
  return (
    <ScrollView style={styles.container}>
      {translations?.map((translation, index) => {
        const { Value, Type, BaseLang, TargetLang, VariantID } = translation;
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
                <Text style={{ color: 'dodgerblue', marginRight: 5 }}>
                  [{BaseLang?.Phonetic?.Content}]
                </Text>
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
                BaseLang?.Inflection?.map((inflection, index) => (
                  <Text style={{ marginBottom: 5, marginLeft: 10 }} key={index}>
                    {inflection?.Content}
                  </Text>
                ))}
            </View>
            <View style={{ flexDirection: 'column' }}>
              {Type === 'subst.' &&
                BaseLang?.Inflection?.map((inflection, index) => (
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
                BaseLang?.Inflection?.map((inflection, index) => (
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
                Översättning
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    color: 'yellowgreen',
                    fontWeight: 'bold',
                  }}
                >
                  {TargetLang?.Translation}
                </Text>
                {TargetLang?.Synonym && (
                  <Text style={{ marginLeft: 10 }}>
                    {' '}
                    ({TargetLang?.Synonym}){' '}
                  </Text>
                )}
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
                Definition
              </Text>
              <Text style={{ marginLeft: 10 }}>
                {BaseLang?.Meaning ? BaseLang?.Meaning : BaseLang?.Comment}
              </Text>
            </View>

            {BaseLang?.Example && (
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginVertical: 10,
                    color: 'dodgerblue',
                  }}
                >
                  Example
                </Text>
                <View style={{ marginLeft: 10 }}>
                  {BaseLang?.Example?.map((example, index) => (
                    <Text key={example?.ID} style={{ marginVertical: 5 }}>
                      ➤ {example?.Content} {' - '}
                      {TargetLang?.Example && (
                        <Text style={{ color: 'steelblue' }}>
                          {TargetLang?.Example[index]?.Content}
                        </Text>
                      )}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {BaseLang?.Idiom && (
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
                  {BaseLang?.Idiom?.map((idiom, index) => (
                    <Text key={idiom?.ID} style={{ marginVertical: 5 }}>
                      ➤ {idiom?.Content} {' - '}
                      {TargetLang?.Idiom && (
                        <Text style={{ color: 'steelblue' }}>
                          {TargetLang?.Idiom[index]?.Content}
                        </Text>
                      )}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            {BaseLang?.Compound && (
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginVertical: 10,
                    color: 'dodgerblue',
                  }}
                >
                  Sammansättningar
                </Text>
                <View style={{ marginLeft: 10 }}>
                  {BaseLang?.Compound?.map((compound, index) => (
                    <Text key={compound?.ID} style={{ marginVertical: 5 }}>
                      {compound?.Content} {' - '}
                      <Text style={{ color: 'rebeccapurple' }}>
                        {TargetLang?.Compound[index]?.Content}
                      </Text>
                    </Text>
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

export default TranslationOther;
