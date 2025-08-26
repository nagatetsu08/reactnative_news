import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { ListItem } from './components/ListItem';
import articles from './dummies/articles.json';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item}) => {
          return <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
