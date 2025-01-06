import { Text } from '@ui-kitten/components';
import React, { useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Definimos la interfaz para las props
interface CarouselProps {
  images: string[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const { width } = useWindowDimensions();

  const handlePageChange = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageChange}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image, { width }]}
            resizeMode="cover"
            defaultSource={require('../assets/no-product-image.png')}
          />
        )}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {`${activeIndex + 1} / ${images.length}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 400,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  counter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  counterText: {
    color: 'white',
    fontSize: 12,
  },
});

export default CarouselComponent;
