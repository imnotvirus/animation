import { MotiTransitionProp } from "moti";
import { useEffect, useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated, {
	Easing,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type SwitchProps = {
	size: number;
	onPress: () => void;
	isActive: boolean;
};

const colors = {
	active: "#2c2c2c",
	inactive: "#dcdcdc",
};

const transition: MotiTransitionProp = {
	type: "timing",
	duration: 300,
	easing: Easing.inOut(Easing.ease),
};

export const Switch: React.FC<SwitchProps> = ({ size, onPress, isActive }) => {
	const trackWidth = useMemo(() => {
		return size * 1.5;
	}, [size]);
	const trackHeight = useMemo(() => {
		return size * 0.4;
	}, [size]);
	const knobSize = useMemo(() => {
		return size * 0.6;
	}, [size]);

	const activeValue = useSharedValue(0);

	const backgroundAnimated = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			activeValue.value,
			[0, 1],

			[colors.active, colors.inactive]
		),
	}));
	const borderAnimated = useAnimatedStyle(() => ({
		borderColor: interpolateColor(
			activeValue.value,
			[0, 1],

			[colors.active, colors.inactive]
		),
		width: interpolate(activeValue.value, [0, 1], [0, knobSize]),
	}));

	const positionAnimated = useAnimatedStyle(() => ({
		translateX: interpolate(
			activeValue.value,
			[0, 1],
			[trackWidth / 4, -trackWidth / 4]
		),
	}));

	useEffect(() => {
		if (isActive) {
			activeValue.value = withTiming(0);
		} else {
			activeValue.value = withTiming(1);
		}
	}, [isActive]);

	return (
		<Pressable onPress={onPress}>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Animated.View
					style={[
						{
							position: "absolute",
							width: trackWidth,
							height: trackHeight,
							borderRadius: trackHeight / 2,
						},
						backgroundAnimated,
					]}
				/>
				<Animated.View
					style={[
						{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: "#fff",
							alignItems: "center",
							justifyContent: "center",
						},
						positionAnimated,
					]}
				>
					<Animated.View
						style={[
							{
								width: knobSize,
								height: knobSize,
								borderRadius: knobSize / 2,
								borderWidth: size * 0.1,
								borderColor: colors.active,
							},
							borderAnimated,
						]}
					/>
				</Animated.View>
			</View>
		</Pressable>
	);
};
