// @ts-nocheck
import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { ProductsCard } from "./Components/productsCard";
import { NavBar } from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { FavoritePage } from "./FavoritePage";
import { fetchFavorites } from "./FavoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";


function App() {
  // const [users, setUsers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openNavbar, setOpenNavbar] = useState(false);

  const favorites = useSelector((state) => state.favorites.favorites); 
  const products = useSelector((state) => state.products.products); 
  const productsloading = useSelector((state) => state.products.loading); 

  const dispatch = useDispatch();

  useEffect(() => {
    //setLoading(true);
    // этот код выполнится один раз при создании компонета.
      dispatch(fetchProducts({inputName, selectedCategory}))
  }, [inputName, selectedCategory]);

  
  useEffect(() => {
    //loadFavorite();
    dispatch(fetchFavorites())
  }, []);

  const handInput = (text) => {
    setInputName(text);
  };

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };
  const handleChangeCategory = (changedCategory) => {
    if (changedCategory === selectedCategory) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(changedCategory);
  };

  const addToFavotes = (product) => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
    if (favorites.some((el) => el.id === product.id)) {
      fetch(`http://localhost:5000/favorites/${product.id}`, {
        method: "DELETE", // или 'PUT'
      }).then((result) => dispatch(fetchFavorites()));
    } else {
      fetch(`http://localhost:5000/favorites`, {
        method: "POST", // или 'PUT'
        body: JSON.stringify(product), // данные могут быть 'строкой' или {объектом}!
        headers: {
          "Content-Type": "application/json",
        },
      }).then((result) =>
        dispatch(fetchFavorites())
      ); /* вызывает функцию как только обработается запрос на сервере */
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              openNavbar={openNavbar}
              handleOpenMenu={handleOpenMenu}
              handInput={handInput}
              handleChangeCategory={handleChangeCategory}
              selectedCategory={selectedCategory}
              products={products}
              addToFavotes={addToFavotes}
              favoritesIds={favorites.map((i) => i.id)}
              loading={productsloading}
            />
          }
        />

        <Route
          path="/favorite"
          element={<FavoritePage />}
        />
      </Routes>
    </div>
  );
}
export default App;

/* поиск по названию */
/* const filteredProducts = inputName
    ? prodacts.filter((el) => el.name.includes(inputName))
    : prodacts; */

/* поиск по категориям в меню и через поиск*/
/*   const filteredProducts = products.filter(
    (el) =>
      el.category.includes(selectedCategory) &&
      el.name.toLowerCase().includes(inputName.toLowerCase())
  ); */

/* useEffect(() => {
    // этот код выполнится один раз при создании компонета.
  }, []); //массив зависимостей. В массиве зависимостей указывается объект за которым следит useEffect и при изменении объекта выполнется код внутри useEffect. useEffect с пустой зависимостью выполняется один раз.

  useEffect(() => {
    return () => {
      console.log("код вызывается при удалении компонента");
    };
  }, []); */

/* создаем массив с избранными товарами 
  const favoriteProducts = products.filter((product) =>
    favoritesIds.includes(product.id)
  ); */

/*добавление товаров во взладку с избранным 
  const addToFavotes = (id) => {
    if (favoritesIds.includes(id)) {
      setFavoritesIds(favoritesIds.filter((i) => i !== id));
      return;
    }
    setFavoritesIds([...favoritesIds, id]);
  }; */

/*  const loadFavorite = () => {
     fetch(`http://localhost:5000/favorites`)
      .then((Response) => Response.json())
      .then((result) => {
        setFavoriteProducts(result);
      })
      .catch((error) => console.log(error));  

  }; */


  /* useEffect(() => {
    //setLoading(true);
    // этот код выполнится один раз при создании компонета.
     fetch(
       `http://localhost:5000/products?q=${inputName}&category_like=${selectedCategory}`
    )
      .then((Response) => Response.json())
      .then((result) => {
        setLoading(false);
        setProducts(result);
      })
      .catch((error) => console.log(error));  
      
  }, [inputName, selectedCategory]); */