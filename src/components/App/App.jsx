import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { coordinates, APIKey } from "../../utils/constants.js";
import "./App.css";
import Header from "../header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherapi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems } from "../../utils/api.js";
import { addItems } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";

let pacificTime;

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    considtion: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal("garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  function getPacificTimeNow() {
    pacificTime = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    return new Date(pacificTime).getTime();
  }

  const handleAddItemModalSubmit = ({ name, urlText, weatherType }) => {
    const idUpdate = getPacificTimeNow();

    const newItem = {
      name,
      link: urlText,
      weather: weatherType,
      _id: `${idUpdate}`,
    };
    addItems(newItem)
      .then(setClothingItems((prevItems) => [newItem, ...prevItems]))
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        closeActiveModal();
      })
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(setSelectCard(""))
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header onAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          onCloseClick={closeActiveModal}
          isOpened={activeModal === "garment" && "modal_opened"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          selectedCard={selectedCard}
          onCloseClick={closeActiveModal}
          isOpened={activeModal === "preview" && "modal_opened"}
          onDeleteClick={handleDeleteClick}
          onSelectCard={setSelectCard}
        />
        <DeleteModal
          onCloseClick={closeActiveModal}
          isOpened={activeModal === "delete" && "modal_opened"}
          onDeleteCard={handleDeleteCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
