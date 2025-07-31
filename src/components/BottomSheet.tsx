import React, {ReactNode, useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BottomSheetProps {
  children: ReactNode;
  visible: boolean;
  snapPoints?: number[];
  initialSnapPoint?: number;
  onSnap?: (index: number) => void;
  backdropOpacity?: number;
  enableBackdropDismiss?: boolean;
  enablePanDownToClose?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  visible,
  snapPoints = [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.6, SCREEN_HEIGHT * 0.3],
  initialSnapPoint = 2,
  onSnap = () => {},
  backdropOpacity = 1,
  enableBackdropDismiss = true,
  enablePanDownToClose = true,
}) => {
  const translateY = useRef(new Animated.Value(snapPoints[0])).current;
  const lastGestureY = useRef<number>(0);
  const currentY = useRef<number>(snapPoints[0]);
  const isDragging = useRef<boolean>(false);

  // Validate snapPoints
  useEffect(() => {
    if (snapPoints.some(point => point <= 0)) {
      console.warn('BottomSheet: snapPoints must be positive numbers');
    }
    if (initialSnapPoint < 0 || initialSnapPoint >= snapPoints.length) {
      console.warn(
        'BottomSheet: initialSnapPoint must be between 0 and snapPoints length',
      );
    }
  }, [snapPoints, initialSnapPoint]);

  // Track translateY changes
  useEffect(() => {
    const id = translateY.addListener(({value}) => {
      currentY.current = value;
    });
    return () => translateY.removeListener(id);
  }, [translateY]);

  const snapToPoint = useCallback(
    (index: number) => {
      Animated.spring(translateY, {
        toValue: snapPoints[index],
        useNativeDriver: false, // Keep as false to maintain compatibility with setValue
        tension: 50,
        friction: 8,
      }).start(() => {
        onSnap(index);
      });
    },
    [snapPoints, onSnap, translateY],
  );

  const findClosestSnapPoint = useCallback(
    (y: number): number => {
      return snapPoints.reduce(
        (closest, point, index) => {
          const diff = Math.abs(y - point);
          return diff < closest.diff ? {index, diff} : closest;
        },
        {index: 0, diff: Infinity},
      ).index;
    },
    [snapPoints],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
        Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        isDragging.current = true;
        lastGestureY.current = currentY.current;
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(0, lastGestureY.current + gestureState.dy);
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        isDragging.current = false;
        const velocityY = gestureState.vy;

        if (enablePanDownToClose && gestureState.dy > 50 && velocityY > 0.5) {
          snapToPoint(0); // Dismiss
        } else {
          const targetIndex = findClosestSnapPoint(currentY.current);
          snapToPoint(targetIndex);
        }
      },
    }),
  ).current;

  // Updated useEffect for visibility
  useEffect(() => {
    if (visible) {
      snapToPoint(initialSnapPoint);
    } else {
      // Reset translateY to ensure consistent starting point
      translateY.setValue(snapPoints[0]);
      Animated.timing(translateY, {
        toValue: snapPoints[0],
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        onSnap(0);
      });
    }
  }, [visible, initialSnapPoint, snapToPoint, snapPoints, translateY, onSnap]);

  // Updated useEffect for keyboard handling
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      if (!visible || isDragging.current) {
        return;
      } // Skip if not visible or dragging
      const keyboardHeight = e.endCoordinates.height;
      const maxSnap = snapPoints[snapPoints.length - 1];
      Animated.spring(translateY, {
        toValue: Math.max(0, maxSnap - keyboardHeight),
        useNativeDriver: false, // Keep as false to maintain compatibility
        tension: 50,
        friction: 8,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      if (visible && !isDragging.current) {
        snapToPoint(findClosestSnapPoint(currentY.current));
      }
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [snapPoints, snapToPoint, findClosestSnapPoint, visible, translateY]);

  const backdropOpacityInterpolate = translateY.interpolate({
    inputRange: [snapPoints[snapPoints.length - 1], snapPoints[0]],
    outputRange: [backdropOpacity, 0],
    extrapolate: 'clamp',
  });

  const handleBackdropPress = () => {
    if (enableBackdropDismiss) {
      snapToPoint(0);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.backdrop, {opacity: backdropOpacityInterpolate}]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
        />
      </Animated.View>

      <Animated.View
        style={[styles.container, {transform: [{translateY}]}]}
        {...panResponder.panHandlers}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 999,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.95,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    zIndex: 1,
  },
});

export default BottomSheet;
