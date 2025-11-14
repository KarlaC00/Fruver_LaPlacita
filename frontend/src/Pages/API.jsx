import React, { useState } from "react";
import "../styles/USDAapi.css";
import Imagetop from "../components/Imagetop";
import mercadoImg from "../assets/carritoMercado.png";
import "../styles/Bienvenida.css";
import FrutasScroll from "../components/Home/FrutasScroll";

const Api = () => {
  // Estados
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "uuuVQYnyW0yl7X6Ln2mErVfyL2pJxVLYHyxqINJR";

  // Buscar alimentos en USDA API
  const searchFoods = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&pageSize=10`
      );

      if (!response.ok) throw new Error("Error al conectar con USDA API");

      const data = await response.json();
      setFoods(data.foods || []);
      setSelectedFood(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Extraer nutrientes específicos
  const getNutrient = (nutrients, name) => {
    const nutrient = nutrients?.find((n) => n.nutrientName?.includes(name));
    return nutrient
      ? `${Math.round(nutrient.value * 10) / 10} ${nutrient.unitName}`
      : "N/A";
  };

  return (
    <>
      <Imagetop
        title="Informate de tu Nutricion"
        height="60vh"
        brightness={50}
      />

      <div className="usda-intro section container">
        <h5 className="center-align light-green-text text-darken-3" style={{ fontWeight: "bold" }}>
          ¿Por qué es importante conocer lo que comes?
        </h5>
        <p className="flow-text center-align">
          En <strong>La Placita</strong> te ayudamos a tomar decisiones
          saludables. Aquí puedes consultar el valor nutricional de miles de
          alimentos. Conoce cuántas calorías, proteínas, carbohidratos o fibra
          tiene lo que consumes. ¡Come con conciencia!
        </p>
      </div>

      <div className="usda-container">
        <h1 className="usda-title">
          <span role="img" aria-label="fruta">
            🍏{" "}
          </span>{" "}
          Informacion nutricional{" "}
          <span role="img" aria-label="verdura">
            🥦
          </span>
        </h1>

        <form onSubmit={searchFoods} className="usda-search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar alimentos (ej: banana, chicken)"
            className="usda-input"
          />
          <button
            type="submit"
            disabled={loading}
            className={`usda-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        {!foods.length && !loading && !error && (
          <div className="usda-suggestions">
            <p className="flow-text center-align">
              🔍 Prueba con alimentos como <strong>banana</strong>,{" "}
              <strong>apple</strong>, <strong>rice</strong>,{" "}
              <strong>chicken</strong>, <strong>avocado</strong>...
            </p>
          </div>
        )}

        {error && <p className="usda-error">⚠️ {error}</p>}

        <div className="usda-results-container">
          {/* Lista de alimentos */}
          {foods.length > 0 && (
            <div className="usda-food-list">
              <h3>Resultados:</h3>
              <ul>
                {foods.map((food) => (
                  <li
                    key={food.fdcId}
                    onClick={() => setSelectedFood(food)}
                    className={
                      selectedFood?.fdcId === food.fdcId ? "active" : ""
                    }
                  >
                    {food.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detalles nutricionales */}
          {selectedFood && (
            <div className="usda-details">
              <h3>{selectedFood.description}</h3>
              <div className="usda-nutrients">
                <h4>Información Nutricional (por 100g):</h4>
                <ul>
                  <li>
                    <strong>Calorías:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Energy")}
                  </li>
                  <li>
                    <strong>Proteína:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Protein")}
                  </li>
                  <li>
                    <strong>Grasas:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Total lipid")}
                  </li>
                  <li>
                    <strong>Carbohidratos:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Carbohydrate")}
                  </li>
                  <li>
                    <strong>Azúcares:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Sugars")}
                  </li>
                  <li>
                    <strong>Fibra:</strong>{" "}
                    {getNutrient(selectedFood.foodNutrients, "Fiber")}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="section row valign-wrapper bienvenida-section container">
        {/* Columna de texto */}
        <div className="col s12 m6">
          <h4
            className="light-green-text text-darken-4"
            style={{ fontWeight: "bold" }}
          >
            ¿Por qué es importante conocer lo que comes?
          </h4>
          <p className="flow-text">
            En <strong>La Placita</strong> te ayudamos a tomar decisiones
            saludables. Aquí puedes consultar el valor nutricional de miles de
            alimentos. Conoce cuántas calorías, proteínas, carbohidratos o fibra
            tiene lo que consumes. ¡Come con conciencia!
          </p>
        </div>

        {/* Columna de imagen */}
        <div className="col s12 m6 center-align">
          <img
            src={mercadoImg}
            alt="Mercado"
            className="responsive-img bienvenida-img"
          />
        </div>
      </div>
      {/* Scroll de Frutas */}
        <FrutasScroll />
    </>
  );
};

export default Api;
