import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector, useDispatch} from 'react-redux';
import {RippleLoader} from 'react-native-indicator';
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import styles from './styles';
import LoadingWrapper from '../../../../components/generic/LoadingWrapper';
import FlowerHeader from '../../../../components/headers/CustomHeader/FlowerHeader';
import {HP, i18n, images, WP} from '../../../../services';
import FlowerComponent from './FlowerComponent/FlowerComponent';
import {getAllProducts} from '../../../../store/actions/main/flowerServiceActions';
import {smallScreens} from '../../../../services/utilities/responsive';
import {NetworkError} from '../../../../components';

const FlowerService = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.flowers.products);

  const dispatch = useDispatch();

  // GET ALL SHOP TAGS
  const tags = products
    .map((product) => product.tags)
    .reduce((acc, curr) => {
      return acc.concat(curr);
    }, [])
    .filter((tag, i, array) => array.findIndex((t) => t.id == tag.id) == i);

  // ADD ALL TAB TO SHOW ALL PRODUCTS
  const allTabs = [
    {
      nameAr: 'الكل',
      nameEn: 'All',
    },
    ...tags,
  ];

  // FILTERED PRODUCTS BASED ON SELECTED TAB
  const filteredProducts = products
    .map((p) => {
      let isTrue;
      isTrue = p.tags.some((t) => t.id === allTabs[selectedTab].id);
      return isTrue ? p : null;
    })
    .filter((el) => el !== null);

  // GET FEATURED PRODUCTS IMAGES
  const featuredProducts = products
    .map((product) => {
      if (product.isFeatured && product.images.length > 0) {
        return product.images.map((image) => image.url);
      }
    })
    .filter((product) => product !== undefined)
    .reduce((acc, next) => {
      return acc.concat(next);
    }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllProducts(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  }, []);

  // List Header Component
  return (
    <LoadingWrapper
      loading={loading}
      navigation={navigation}
      header={products.length > 0 ? false : true}>
      <View style={styles().container}>
        {products.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles().ListHeaderComponent}>
                <View>
                  <FlowerHeader
                    children={i18n.t('giftsShopHome.gitfsShop')}
                    navigation={navigation}
                    cart
                    btn
                  />
                </View>

                <View
                  style={{
                    height: smallScreens ? HP('20') : HP('30'),
                  }}>
                  {!loading && featuredProducts.length > 0 ? (
                    <Carousel
                      loop
                      layout="default"
                      autoplay
                      autoplayInterval={4000}
                      itemWidth={WP('100')}
                      sliderWidth={WP('100')}
                      data={featuredProducts}
                      renderItem={({item, index}) => (
                        <SliderItem
                          item={item}
                          index={index}
                          blackOverlay
                          height={HP('35')}
                        />
                      )}
                    />
                  ) : null}
                </View>
                <View style={styles().tabsContainer}>
                  <FlatList
                    keyExtractor={(item, i) => String(i)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{padding: 0}}
                    horizontal
                    data={allTabs}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedTab(index);
                          }}
                          activeOpacity={1}
                          style={[
                            selectedTab === index
                              ? styles().activeTab
                              : styles().inActiveTab,
                          ]}>
                          <Text
                            style={[
                              selectedTab === index
                                ? styles().activeTabfont
                                : styles().inActiveTabFont,
                            ]}>
                            {I18nManager.isRTL ? item.nameAr : item.nameEn}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            }
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            numColumns={2}
            data={selectedTab === 0 ? products : filteredProducts}
            keyExtractor={(item, i) => String(i)}
            renderItem={({item, index}) => (
              <FlowerComponent navigation={navigation} product={item} />
            )}
          />
        ) : (
          <NetworkError />
        )}
      </View>
    </LoadingWrapper>
  );
};

export const SliderItem = ({
  item,
  index,
  overlay,
  blackOverlay,
  height,
  local,
}) => {
  return (
    <View
      style={[
        height ? {height, justifyContent: 'center', alignItems: 'center'} : {},
      ]}>
      {local ? (
        <Image
          source={item}
          style={{
            ...styles().imageSlide,
            height: 100,
            width: 100,
          }}
        />
      ) : (
        <NetworkImage
          indicator={Progress.Pie}
          style={styles().imageSlide}
          source={{uri: item}}
        />
      )}

      <View
        style={
          blackOverlay
            ? styles().blackOverlayView
            : overlay
            ? styles().overlayView
            : {}
        }></View>
    </View>
  );
};

export default FlowerService;
