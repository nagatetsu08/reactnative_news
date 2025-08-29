import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { ListItem } from './components/ListItem';
import dummyArticles from './dummies/articles.json';
import axios from 'axios';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './screens/HomeScreen';
import { ArticleScreen } from './screens/ArticleScreen';
import { ClipScreen } from './screens/ClipScreen';
import { FontAwesome } from '@expo/vector-icons';
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// 仕様が変わった。
// 2025/08/26現在、日本語の記事が取得できないのでUSに変更
const apiKey = Constants.expoConfig?.extra?.newsApiKey;
const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * 以下のようにStackとして切り出すことで、Home画面以降の遷移をグルーピングできる。
 * ただし、これ１個だと、ClipタブでArticleに飛ぶとHomeStackの画面遷移グループが適用されて
 * タブがHomeをさしてしまったり、Backで戻るとHomeに戻ってしまう。
 * それを防ぐために、ナビゲーションごとにStackを切り出す必要がある。
 * 
 * つまり、ReactNavigationの基本は画面遷移パターンごとにStackを作ってやること
 * 
 */

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clip" component={ClipScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  )
}

const ScreenOption = ({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = "home";
            } else if (route.name === 'ClipTab') {
              iconName = "bookmark";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={ScreenOption}>
            <Tab.Screen 
              name="HomeTab"
              component={HomeStack}
              options={{ headerShown: false, title: "Home" }}
            />
            <Tab.Screen 
              name="ClipTab" 
              component={ClipStack} 
              options={{ headerShown: false, title: "Clip" }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
