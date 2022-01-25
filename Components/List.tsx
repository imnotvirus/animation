import { Entypo } from "@expo/vector-icons";
import faker from "faker";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

faker.seed(10);
const data = [...Array(20).keys()].map(() => ({
	key: faker.datatype.uuid(),
	job: faker.animal.crocodilia(),
}));
const _colors = {
	active: "#FCD259FF",
	inactive: "#FCD25900",
	font: "#36303f",
};
const _spacing = 10;
const List: React.FC = () => {
	const ref = useRef<FlatList>(null);
	const [index, setIndex] = useState(0);
	const [viewPosition, setViewPosition] = useState(0);
	useEffect(() => {
		ref.current?.scrollToIndex({
			index,
			animated: true,
			viewOffset: viewPosition >= 0.5 ? 0 : _spacing,
			viewPosition: viewPosition,
		});
	}, [index, viewPosition]);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				ref={ref}
				initialScrollIndex={index}
				style={{ flexGrow: 0 }}
				keyExtractor={(item) => item.key}
				contentContainerStyle={{ paddingLeft: _spacing }}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index: fIndex }) => (
					<ItemList
						item={item}
						fIndex={fIndex}
						setIndex={setIndex}
						index={index}
					/>
				)}
			/>
			<View
				style={{
					alignItems: "center",
					flexDirection: "row",
					marginTop: _spacing * 10,
				}}
			>
				<View style={{ alignItems: "center" }}>
					<Text style={[styles.font, { marginBottom: _spacing }]}>
						Scroll Position
					</Text>
					<View
						style={{
							flexDirection: "row",
							width: width / 2,
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								setViewPosition(0);
							}}
						>
							<View
								style={{
									padding: _spacing,
									backgroundColor: _colors.active,
									borderRadius: _spacing,
									marginRight: _spacing,
								}}
							>
								<Entypo name="align-left" size={24} color={_colors.font} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setViewPosition(0.5);
							}}
						>
							<View
								style={{
									padding: _spacing,
									backgroundColor: _colors.active,
									borderRadius: _spacing,
									marginRight: _spacing,
								}}
							>
								<Entypo
									name="align-horizontal-middle"
									size={24}
									color={_colors.font}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setViewPosition(1);
							}}
						>
							<View
								style={{
									padding: _spacing,
									backgroundColor: _colors.active,
									borderRadius: _spacing,
									marginRight: _spacing,
								}}
							>
								<Entypo name="align-right" size={24} color={_colors.font} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ alignItems: "center" }}>
					<Text style={[styles.font, { marginBottom: _spacing }]}>
						Navigation
					</Text>
					<View
						style={{
							flexDirection: "row",
							width: width / 2,
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								if (index === 0) {
									return;
								}
								setIndex((index) => index - 1);
							}}
						>
							<View
								style={{
									padding: _spacing,
									backgroundColor: _colors.active,
									borderRadius: _spacing,
									marginRight: _spacing,
								}}
							>
								<Entypo name="arrow-left" size={24} color={_colors.font} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								if (index === data.length - 1) {
									return;
								}
								setIndex((index) => index + 1);
							}}
						>
							<View
								style={{
									padding: _spacing,
									backgroundColor: _colors.active,
									borderRadius: _spacing,
									marginRight: _spacing,
								}}
							>
								<Entypo name="arrow-right" size={24} color={_colors.font} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};
export default List;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
	},
	font: {
		color: _colors.font,
		fontWeight: "700",
	},
});

interface ItemListProps {
	fIndex: number;
	index: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
	item: any;
}

const ItemList: React.FC<ItemListProps> = ({
	fIndex,
	index,
	setIndex,
	item,
}) => {
	const animated = useSharedValue(0);

	const backgroundColor = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			animated.value,
			[0, 1],
			[_colors.active, _colors.inactive]
		),
		opacity: interpolate(animated.value, [0, 1], [1, 0.5]),
	}));
	useEffect(() => {
		if (fIndex === index) {
			animated.value = withTiming(0, {
				duration: 500,
			});
		} else {
			animated.value = withTiming(1, {
				duration: 500,
			});
		}
	}, [fIndex, index]);
	return (
		<TouchableOpacity
			onPress={() => {
				setIndex(fIndex);
			}}
		>
			<Animated.View
				style={[
					{
						marginRight: _spacing,
						padding: _spacing,
						borderWidth: 2,
						borderColor: _colors.active,
						borderRadius: 12,
					},
					backgroundColor,
				]}
			>
				<Text style={styles.font}>{item.job}</Text>
			</Animated.View>
		</TouchableOpacity>
	);
};
