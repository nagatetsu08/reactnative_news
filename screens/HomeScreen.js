import { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { ListItem } from '../components/ListItem';
import axios from 'axios';
import Constants from 'expo-constants';

// 仕様が変わったみたい。。。
const apiKey = Constants.expoConfig?.extra?.newsApiKey;
const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

export const HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async() => {
    try {
      const response = await axios.get(URL);
      // console.log(response.data.articles)
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error)
    }
    // setArticles(dummyArticles);
  }

  // 画面の初期化時に1回だけ実行される（第二引数に空の配列を渡しているとそうなる）
  useEffect(() => {
    fetchArticles();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item}) => {
          return <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', {article: item})}
          />
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
