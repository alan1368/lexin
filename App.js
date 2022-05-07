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
  Animated,
} from 'react-native';
import Languages from './components/Languages';
import SearchBar from './components/SearchBar';
import TranslationOther from './components/TranslationOther';
import Navbar from './components/Navbar';

export default function App() {
  const [word, setWord] = useState('få');
  const [translations, setTranslations] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: '',
    value: 'sdh',
  });
  const [error, setError] = useState();
  // console.log('word', word);
  // console.log('selec', selectedLanguage);
  // console.log(translations);
  const fetchData = async () => {
    if (word && selectedLanguage) {
      try {
        const response = await fetch(
          `http://lexin.nada.kth.se/lexin/service?searchinfo=both,swe_${selectedLanguage?.value},${word}&output=JSON`,

          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (data.Status === 'found') {
          setTranslations(data.Result);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedLanguage]);

  return (
    <View style={styles.container}>
      {/* <Languages
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      /> */}
      {/* <SearchBar
        word={word}
        setWord={setWord}
        fetchData={fetchData}
        setSelectedLanguage={setSelectedLanguage}
      /> */}
      <View
        style={{
          backgroundColor: 'ghostwhite',
          height: 680,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          zIndex: -10,
        }}
      >
        <TranslationOther translations={translations} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#174367',
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
});
