import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !isLoading ? (
    <div className="App">
      <header>
        <div className="header-container">
          <img src={logo} alt="logo"></img>
        </div>
      </header>
      <main>
        <div className="restaurant-container">
          <div className="restaurant-left-container">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="restaurant-right-container">
            <img src={data.restaurant.picture}></img>
          </div>
        </div>

        <div className="block-categories">
          <div className="restaurant-left-container">
            {data.categories.map((elem, index) => {
              console.log("elem", elem);
              return (
                <div key={index} className="categories-container">
                  <h2>{elem.name}</h2>

                  <div className="categorie-container">
                    {elem.meals.map((elem) => {
                      return (
                        <div key={elem.id} className="elem-container">
                          {elem.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>{" "}
        </div>
        <div className="restaurant-right-container"></div>
      </main>
    </div>
  ) : (
    <span> En cours de chargement ... </span>
  );
}

export default App;
