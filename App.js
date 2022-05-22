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
  StatusBar,
} from 'react-native';
import Languages from './components/Languages';
import SearchBar from './components/SearchBar';
import TranslationOther from './components/TranslationOther';
import Navbar from './components/Navbar';
import TranslationSvenska from './components/TranslationSvenska';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [word, setWord] = useState('');
  const [translations, setTranslations] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: '',
    value: '',
  });
  const [notFound, setNotFound] = useState();
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);
  console.log(selectedLanguage.value);
  console.log('word', word);
  console.log('trans', translations);
  const languageHandler = () => {
    setIsVisible(!isVisible);
  };

  const fetchData = async () => {
    if (word && selectedLanguage) {
      try {
        const response = await fetch(
          `http://lexin.nada.kth.se/lexin/service?searchinfo=both,swe_${selectedLanguage?.value},${word}&output=JSON`,

          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
        );
        const data = await response.json();
        data?.Status === 'no unique matching'
          ? setNotFound(data.Corrections)
          : setNotFound(['']);

        if (data?.Status === 'found') {
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
    <SafeAreaView style={styles.container}>
      {/* <Languages
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      /> */}
      <SafeAreaView>
        <SearchBar
          word={word}
          setWord={setWord}
          fetchData={fetchData}
          setSelectedLanguage={setSelectedLanguage}
          languageHandler={languageHandler}
        />
      </SafeAreaView>

      <View
        style={{
          backgroundColor: 'sienna',
          height: 45,
          width: '100%',
          zIndex: -20,
          top: 100,
          position: 'absolute',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text>
          🇸🇪
          <Text style={{ color: 'white', fontSize: 18 }}> Svenska </Text>
          <MaterialCommunityIcons
            name="arrow-left-right"
            size={24}
            color="white"
          />{' '}
          <Text style={{ color: 'white', fontSize: 18 }}>
            {!selectedLanguage.value ? 'Välj Språk' : selectedLanguage.label}
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'ghostwhite',
          height: '93%',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          zIndex: -10,
          flex: 1,
        }}
      >
        {/* {isVisible ? (
          <Languages
            setSelectedLanguage={setSelectedLanguage}
            languageHandler={languageHandler}
          />
        ) : selectedLanguage.value === 'swe' ? (
          <TranslationSvenska translations={translations} />
        ) : (
          <TranslationOther translations={translations} />
        )} */}
        {isVisible ? (
          <Languages
            setSelectedLanguage={setSelectedLanguage}
            languageHandler={languageHandler}
          />
        ) : (
          <TranslationOther translations={translations} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#174367',
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'space-between',
  },
});
