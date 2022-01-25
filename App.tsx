import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import List from "./Components/List";

const App: React.FC = () => {
	const [active, setActive] = useState(false);
	return (
		<>
			<StatusBar hidden />
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<List />
			</View>
		</>
	);
};

export default App;
