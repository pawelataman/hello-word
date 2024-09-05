import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';



export default function Index() {

  const [voices, setVoices] = useState<Speech.Voice[]>([])

  useEffect(() => {
    loadVoices()
  },[])

  const loadVoices = async () => {
    console.clear()
    const  voices  = await Speech.getAvailableVoicesAsync()
    console.log(voices)
    const voicesFiltered = voices.filter(v => v.language.toLocaleLowerCase().includes('pl'))
    console.log(voicesFiltered.length)
    console.log(voicesFiltered.map(v => v.language))
    console.log(voicesFiltered.map(v => v.name))

    setVoices(voicesFiltered)
  }

  const speak = () => {
    Speech.stop()
    const thingToSay = 'Nobody at NASA gave a goddamn about the weather in Jersey. This fact, as true and as simple as it was, had not stopped my Aunt Rosie from pacing around the parlor all morning and pressing her face to the front window in search of thunderstorms. My mother had yelled at her for smearing rouge on the glass, and she, of course, had yelled right back. And soon, everybody was yelling. ';
    const haha = 'The sun is shining over the mountains'
    const thingsToSayPl = 'Co sie kurwa patrzysz'
    Speech.speak(thingsToSayPl,{
      voice:voices[0]?.identifier,
      language:'pl', 
      pitch:1, 
      rate:.8,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
      <Button title="Stop" color="red" onPress={() => Speech.stop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});