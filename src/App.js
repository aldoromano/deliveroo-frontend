import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tabOrder, setTabOrder] = useState([]);

  const fetchData = async () => {
    // const response = await axios.get("http://localhost:3200/");
    const response = await axios.get(
      "https://site--deliveroo-backend--fqvvk7kgjqkf.code.run"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickMeal = (id, description, price, action) => {
    const newTabOrder = [...tabOrder];
    let isFound = false; // A-t-on trouvé l'iD ?
    let elemToRemove = -1; // Element à supprimer si quantity nulle
    newTabOrder.map((elem, index) => {
      if (elem.id === id) {
        action === "+" ? elem.quantity++ : elem.quantity--;
        isFound = true;
      }
      if (!elem.quantity) {
        elemToRemove = index;
      }
      return 0;
    });
    if (!isFound)
      newTabOrder.push({
        id: id,
        description: description,
        price: price,
        quantity: 1,
      });
    // Suppression si quantity nulle
    if (elemToRemove >= 0) newTabOrder.splice(elemToRemove, 1);
    setTabOrder(newTabOrder);
  };

  // Calcul du sous-total
  const subTotal = () => {
    let subTotal = 0;
    tabOrder.map((elem) => {
      return (subTotal += elem.quantity * elem.price);
    });
    return subTotal;
  };

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
            <img src={data.restaurant.picture} alt="restaurant"></img>
          </div>
        </div>

        <div className="block-categories">
          <div className="restaurant-left-container">
            {data.categories.map((elem, index) => {
              //console.log("elem", elem);

              if (elem.meals.length) {
                return (
                  <div key={index} className="categories-container">
                    <h2>{elem.name}</h2>

                    <div className="categorie-container">
                      {elem.meals.map((elem) => {
                        return (
                          <div
                            key={elem.id}
                            className="meal-container"
                            onClick={() => {
                              handleClickMeal(
                                elem.id,
                                elem.title,
                                elem.price,
                                "+"
                              );
                            }}
                          >
                            <div>
                              <h3 className="title-meal">{elem.title}</h3>
                              {elem.description && (
                                <div className="description-container">
                                  <p>{elem.description}</p>
                                </div>
                              )}
                              <div className="price-popular-container">
                                <p>{elem.price} €</p>
                                {elem.popular && (
                                  <p style={{ color: "orange" }}>popular</p>
                                )}
                              </div>
                            </div>
                            <div className="image-meal">
                              {elem.picture ? (
                                <img src={elem.picture} alt="meal"></img>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="restaurant-right-container">
            <div className="panier">
              <button className={tabOrder.length ? "button-on" : "button-off"}>
                Valider mon panier
              </button>
              <div className="panier-content">
                {!tabOrder.length
                  ? "Votre panier est vide "
                  : tabOrder.map((elem) => {
                      return (
                        <div className="panier-element" key={elem.id}>
                          <div className="quantity-desc-container">
                            <div
                              className="plus-minus"
                              onClick={() => {
                                handleClickMeal(
                                  elem.id,
                                  elem.title,
                                  elem.price,
                                  "-"
                                );
                              }}
                            >
                              -
                            </div>
                            <div>{elem.quantity}</div>
                            <div
                              className="plus-minus"
                              onClick={() => {
                                handleClickMeal(
                                  elem.id,
                                  elem.title,
                                  elem.price,
                                  "+"
                                );
                              }}
                            >
                              +
                            </div>
                            <div>{elem.description}</div>
                          </div>
                          <div>
                            <div>{(elem.price * elem.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      );
                    })}

                {tabOrder.length ? (
                  <div className="subtotal-container">
                    <div className="subtotal-container-line">
                      <div>sous-total : </div>
                      <div>{subTotal().toFixed(2)} </div>
                    </div>
                    <div className="subtotal-container-line">
                      <div>Frais de livraison : </div>
                      <div>2.5 €</div>
                    </div>
                    <div className="subtotal-container-line">
                      <div>Total : </div>
                      <div>{(subTotal() + 2.5).toFixed(2)}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <span> En cours de chargement ... </span>
  );
}

export default App;
