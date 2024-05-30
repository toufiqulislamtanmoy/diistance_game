"use client"
import Map from "@/components/Map";
import cities from "@/data/cities";
import { calculateDistance } from "@/utils/distance";
import { useState } from "react";


export default function Home() {
  const [score, setScore] = useState(1500);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [highScore, setHighScore] = useState(0);

  const handleCitySelected = (selectedPosition) => {
    const currentCity = cities[currentCityIndex];
    const distance = calculateDistance(
      selectedPosition.lat,
      selectedPosition.lng,
      currentCity.position.lat,
      currentCity.position.lng
    );

    if (distance <= 50) {
      setMessage(`Correct! You were within ${distance.toFixed(2)} km of ${currentCity.name}`);
      setHighScore(highScore + 1);
    } else {
      setMessage(`You were ${distance.toFixed(2)} km away from ${currentCity.name}`);
    }

    setScore(score - distance);
    setCurrentCityIndex(currentCityIndex + 1);

    if (score - distance <= 0 || currentCityIndex + 1 >= cities.length) {
      alert(`Game Over! Your high score is ${highScore + 1}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(1500);
    setCurrentCityIndex(0);
    setHighScore(0);
    setMessage('');
  };
  return (
    <>
 <div className="container">
      <h1>City Guessing Game</h1>
      <p>Score: {score.toFixed(2)} km</p>
      <p>{message}</p>
      <Map cities={cities} onCitySelected={handleCitySelected} />
    </div>
    </>
  );
}
