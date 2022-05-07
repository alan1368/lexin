import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const TranslationSvenska = ({ translations }) => {
  return (
    <ScrollView style={styles.translateContainer}>
      {translations?.map((translation) => {
        const { Value, Type, Phonetic, Inflection } = translation;
        return (
          <View key={translation.VariantID} style={{ marginBottom: 80 }}>
            <Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{Value} </Text>{' '}
              [{Phonetic?.Content}] {Type}
            </Text>
            <Text>
              {'\uff1c'}
              {Inflection?.map((inflection, index) => (
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
  );
};

const styles = StyleSheet.create({
  translateContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 50,
    marginTop: 50,
    padding: 20,
  },
});

export default TranslationSvenska;
