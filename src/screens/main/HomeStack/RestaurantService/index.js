import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import styles from './styles';
import {SliderItem} from '../FlowerService';
import {
  LoadingWrapper,
  NetworkError,
  RestaurantHeader,
} from '../../../../components';
import ProductComponent from './ProductComponent';
import {colors, HP, i18n, WP} from '../../../../services';
import {getAllProducts} from '../../../../store/actions/main/restaurantActions';

const RestaurantService = ({navigation}) => {
  //   const filteredProducts = [];
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.restaurant.products);
  const [selectedTab, setSelectedTab] = useState(0);

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

  // GET ALL SHOP TAGS
  //   const tags = products.map((product) => {
  //     return {
  //       id: product.id,
  //       groupNameEn: product.groupNameEn,
  //       groupNameAr: product.groupNameAr,
  //     };
  //   });

  const tags = products
    .map((product) => product.tags)
    .reduce((acc, curr) => {
      return acc.concat(curr);
    }, [])
    .filter((tag, i, array) => array.findIndex((t) => t.id == tag.id) == i);

  console.log(selectedTab);
  const allTabs = [
    {
      nameAr: 'الكل',
      nameEn: 'All',
    },
    ...tags,
  ];

  //   // FILTERED PRODUCTS BASED ON SELECTED TAB
  //   const filteredProducts = products.filter(
  //     (p) => p.id == allTabs[selectedTab].id,
  //   );

  // FILTERED PRODUCTS BASED ON SELECTED TAB
  const filteredProducts = products
    .map((p) => {
      let isTrue;
      isTrue = p.tags.some((t) => t.id === allTabs[selectedTab].id);
      return isTrue ? p : null;
    })

    .filter((el) => el !== null);
  const dispatch = useDispatch();
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
  
  return (
    <LoadingWrapper
      navigation={navigation}
      header={products.length > 0 ? false : true}
      loading={loading}>
      {products.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <View style={styles().ListHeaderComponent}>
              <RestaurantHeader
                btn
                navigation={navigation}
                cart
                children={i18n.t('restaurant.restaurant')}
              />
              <View
                style={{
                  height: HP('25'),
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
          }}
          data={selectedTab === 0 ? products : filteredProducts}
          keyExtractor={(item, i) => String(i)}
          renderItem={({item, index}) => (
            <ProductComponent product={item} navigation={navigation} />
          )}
        />
      ) : (
        <NetworkError />
      )}
    </LoadingWrapper>
  );
};

export default RestaurantService;
