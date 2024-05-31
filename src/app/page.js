"use client"
import cities from "@/data/cities";
import { calculateDistance } from "@/utils/distance";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { rule } from "postcss";
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [score, setScore] = useState(1500);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [round, setRound] = useState(1);
  const [correctLocation, setCorrectLocation] = useState(null);
  const [rules, setRules] = useState(null);

  useEffect(() => {
    fetch('/rule.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setRules(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);
  console.log(rules);



  const handleCitySelected = (selectedPosition) => {


    const currentCity = cities[currentCityIndex];
    const distance = calculateDistance(
      selectedPosition.lat,
      selectedPosition.lng,
      currentCity.position.lat,
      currentCity.position.lng
    );
    setCorrectLocation(currentCity?.position);
    setRound(round + 1);
    if (distance <= 50) {
      toast.success(`Greet🎊! You were within ${distance.toFixed(2)} km of ${currentCity.name}`)
      setHighScore(highScore + 1);
    } else {
      toast.error(`You were ${distance.toFixed(2)} km away from ${currentCity.name}`)
    }

    setScore(score - distance);
    setCurrentCityIndex(currentCityIndex + 1);

    if (score - distance <= 0 || currentCityIndex + 1 >= cities.length) {

      Swal.fire({
        title: `Game Over! Your high score is ${highScore}`,
        confirmButtonText: 'Try again',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        }
      });

    }
  };

  const resetGame = () => {
    setScore(1500);
    setRound(1)
    setCurrentCityIndex(0);
    setHighScore(0);
    setCorrectLocation(null);
  };
  return (
    <>
      {/* Modal Content */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Rules</h3>
          <ul className="px-5 ">
            {rules &&
              rules?.map((rule, index) => {
                return (
                  <>
                    <li className="list-decimal text-2xl font-bold my-2" key={index}> {rule?.title}</li>
                    <p>{rule?.description}</p>
                  </>
                )
              })
            }
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Modal Content End */}


      <div className="flex flex-col lg:flex-row-reverse font-Poppins">
        <div className="lg:w-1/3 w-full p-5 shadow-xl bg-rose-200  max-h-[50vh] md:max-h-screen lg:max-h-screen overflow-y-scroll">
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-center text-2xl font-Kaushan font-semibold">City Guessing Game
            </h1>
            <button onClick={() => document.getElementById('my_modal_2').showModal()}><FaRegCircleQuestion /></button>
          </div>
          <div className="w-full bg-white h-[2px] my-2"></div>
          <div className="flex lg:flex-row flex-col justify-between items-center">
            <p className="flex items-center text-2xl gap-1">
              <span className="font-semibold ">Score:</span>
              {score.toFixed(2)} km <GiPathDistance className="text-2xl" /> </p>
            <p className="text-2xl font-semibold">Correct Guessed: {highScore}</p>
          </div>
          <div className="w-full bg-white h-[2px] my-2"></div>
          <div className="my-5 ">
            {
              cities?.map((city, index) =>
                <details open={round === (index + 1)} key={index} className={`${round === (index + 1) ? "bg-yellow-200" : "bg-gradient-to-l from-green-100/25 to-red-100/80"}  my-5`}>
                  <summary className=" py-5 px-2">
                    Round {index + 1}
                  </summary>
                  <h1 className="p-3">Guess The City <span className="font-bold">{city?.name}</span> from the map</h1>
                </details>
              )
            }
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <Map cities={cities} round={round} onCitySelected={handleCitySelected} correctLocation={correctLocation} />
        </div>
      </div>
    </>
  );
}
