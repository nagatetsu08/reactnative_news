import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

/**
 * 
 * @param {
 *  imageUrl: string ニュースのURL
 *  title: string ニュースのタイトル
 *  author: string ニュースの著者
 *  onPress: タップされた時のイベント処理
 * } props 
 * @returns 
 */
export const ListItem = (props) => {
  return (
    // TouchableOpacityで囲むとタップ可能になる
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View style={styles.leftContainer}>
        <Image
            style={{width: 100, height: 100}}
            source={{ uri: props.imageUrl }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.text}>
            {props.title}
        </Text>
        <Text style={styles.subText}>{props.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
  image: {
    width: 95,
    height: 95,
  },
});
