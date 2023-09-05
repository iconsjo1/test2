import React, {useState, useEffect, useRef} from 'react';
import {
  View, 
  ImageBackground, 
  FlatList,
  I18nManager,
} from 'react-native';
import {
  LoadingWrapper,
  Text,
  TouchableOpacity,
  NetworkError,
} from '../../../../components';
import {useSelector, connect} from 'react-redux';
import {getAllNews} from '../../../../store/actions';
import styles from './styles';
import {i18n, routesNames, colors, WP} from '../../../../services';
import ViewPager from '@react-native-community/viewpager';
import Dots from '../../../../../fixed-node-modules/react-native-dots-pagination';

const News = ({getAllNews, navigation}) => {
  const [loading, setLoading] = useState(true);
  const news = useSelector((state) => state.home.news);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const cbSuccess = (length) => {
      setLoading(false);
      length ? setPage(length) : null;
    };
    const cbFailure = () => setLoading(false);
    getAllNews(i18n.locale === 'en' ? '?lang=en' : '', cbSuccess, cbFailure);
  }, []);

  return (
    <View style={{minHeight: WP('60')}}>
      <LoadingWrapper loading={loading}>
        {news ? (
          <>
            <View style={styles().newsTopBar}>
              <Text style={styles().newsText}>
                {i18n.t('homeTabTranslations.news')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routesNames.newsList, {news})
                }
                style={{padding: 10}}>
                <Text style={styles().seemoreText}>
                  {i18n.t('homeTabTranslations.seeMore')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles().newsContainer}>
              <FlatList
                pagingEnabled
                keyExtractor={(el, i) => String(el.id)}
                horizontal
                onMomentumScrollEnd={(e) => {
                  const currentindex = Math.round(
                    e.nativeEvent.contentOffset.x / WP(100),
                  );
                  setPage(currentindex);
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({item: el, index: i}) => (
                  <View key={i} style={styles().newsListItem}>
                    <ImageBackground
                      resizeMode="cover"
                      style={styles().imageStyle}
                      source={{uri: el.thumbnail}}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text style={styles().imageLabel}>
                          {i18n.t('homeTabTranslations.news')}
                        </Text>
                      </View>
                    </ImageBackground>
                    <Text style={styles().headline}>
                      {Capitalize(String(el.post_title).toLowerCase())}
                    </Text>
                    <Text style={styles().smallDesc} grey>
                      {el.post_excerpt}
                    </Text>
                  </View>
                )}
                data={news}
              />
            </View>
            <View style={styles().dotsContainer}>
              <Dots
                passiveBorder
                passiveBorderWidth={1}
                passiveBorderColor={colors.grey}
                passiveDotWidth={10}
                activeDotWidth={11}
                activeDotHeight={11}
                passiveDotHeight={10}
                activeColor={colors.black}
                passiveColor={colors.whiteBg}
                length={news.length}
                active={I18nManager.isRTL ? news.length - page - 1 : page}
              />
            </View>
          </>
        ) : (
          <NetworkError />
        )}
      </LoadingWrapper>
    </View>
  );
};

export default connect(null, {getAllNews})(News);

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
