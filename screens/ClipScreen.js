import { SafeAreaView, StyleSheet, Text} from 'react-native';


export const ClipScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>text</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
});
