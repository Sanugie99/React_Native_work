// components/ShadowBox.js
import { View, StyleSheet, Platform } from 'react-native';

const ShadowBox = () => {
  return <View style={styles.box} />;
};

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

export default ShadowBox;
