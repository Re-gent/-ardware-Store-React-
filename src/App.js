import { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { FavoritePage } from "./pages/favorite";
import { fetchFavorites } from "./pages/favorite/FavoritesSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./pages/main/productsSlice";
import { CartPage } from "./pages/cart";
import { loadCart } from "./pages/cart/slices";
import { Product } from "./pages/product";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const copyParams = new URLSearchParams(searchParams);

  const handleChangeFilters = (key, value) => {
  
    if (copyParams.get(key) === value || !value) {
      copyParams.delete(key)
      key === "_order" && copyParams.delete("_sort")
    }else if(key === "_order") {
      copyParams.set("_sort", "price");
      copyParams.set("_order", value);
    }else {
      copyParams.set(key, value);
    }
    if(key !== '_page'){
      copyParams.set('_page', "1")
    }
    setSearchParams(copyParams);
  };

  /* useEffect(() => {
    setPage(1);
  }, [inputName, selectedCategory, sort, price]);
 */
  useEffect(() => {
    //setLoading(true);
    // этот код выполнится один раз при создании компонета.
    if (searchParams) {
      // @ts-ignore
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);

  useEffect(() => {
    copyParams.set("_page", "1")
    setSearchParams(copyParams)
    //loadFavorite();
    // @ts-ignore
    dispatch(fetchFavorites());
    // @ts-ignore
    dispatch(loadCart());
  }, []);
  /* Данный способ фильтрации был заменен на реализацию с помощью React Router (useSearchParams)  */
  /* const handInput = (text) => {
    setInputName(text);
  };

  const handleChangeCategory = (changedCategory) => {
    if (changedCategory === selectedCategory) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(changedCategory);
  };

  const handleChangeSort = (order) => {
    if (sort === order) {
      setSort("");
      return;
    }
    setSort(order);
  }; */

  return (
    <div>
      <Routes>
        <Route
          path="/"
          // @ts-ignore
          element={<Main searchParams={searchParams} handleChangeFilters={handleChangeFilters} />}
        />

        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
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

/* const onClickFavorites = (product) => {
    /* возвращает true, усли хотя бы на одном из элементов выполняется условие */
/* if (favorites.some((el) => el.id === product.id)) {
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
      ); 
      // вызывает функцию как только обработается запрос на сервере 
    }
  } */
