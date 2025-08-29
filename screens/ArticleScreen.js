import { SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { ClipButton } from '../components/ClipButton';
import { addClip,deleteClip } from '../store/UserSlice';

export const ArticleScreen = ({route}) => {
  const {article} = route.params;
  const dispatch = useDispatch();
  const clips = useSelector((state) => state.user.clips); //現在のstateで管理されているclipsを取得

  const isCliped =  clips.some((clip) => clip.url === article.url); //clipsの中に同じurlがあるかどうか

  // onPress時の関数
  const onPressClip = () => {
    if(isCliped) {
      dispatch(deleteClip(article));
    } else {
      dispatch(addClip(article));
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
        <ClipButton
          onPress={onPressClip}
          enabled={isCliped}
        />
        <WebView
          style={styles.container}
          source={{ uri: article.url }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
});
