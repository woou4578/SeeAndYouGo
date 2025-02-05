import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import UpdateLog from "./components/UpdateLog";
import Cafeteria from "./components/Cafeteria";
import "./App.css";

// 시간 정보가 포함된 식단 인원 정보 request
function App() {
	const [restaurantData, setRestaurantData] = useState([]);

	useEffect(() => {
		// JSON 파일
		const jsonFilePaths = [
			"assets/json/restaurant1.json",
			"assets/json/restaurant2.json",
			"assets/json/restaurant3.json",
		];
		// API URL 주소
		// const jsonFilePaths = [
		// 	"http://seeandyougo:8080/get_congestion/restaurant1",
		// 	"http://seeandyougo:8080/get_congestion/restaurant2",
		// 	"http://seeandyougo:8080/get_congestion/restaurant3",
		// ];

		// 여러 JSON 파일 가져오기
		Promise.all(
			jsonFilePaths.map((path) =>
				fetch(path).then((response) => response.json())
			)
		)
			.then((dataArray) => setRestaurantData(dataArray))
			.catch((error) => console.error("Error fetching JSON:", error));
	}, []);

	return (
		<div className="App">
			<Header />
			{restaurantData.map((val, idx) =>
				idx === 0 ? (
					<UpdateLog key={idx} updateTime={val.dateTime} />
				) : null
			)}
			{restaurantData.map((val, idx) => {
				console.log(val)
				return (
					<Cafeteria
						idx={idx + 1}
						key={idx}
						value={(val.connected / val.capacity) * 100}
					/>
				);
			})}
		</div>
	);
}

export default App;
