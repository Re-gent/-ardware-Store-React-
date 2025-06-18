
import { useEffect, useState } from "react";
import { Header } from "../../Components/header";
import { NavBar } from "../../Components/navBar";
import { ProductsCard } from "../../Components/productCard";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { Sort } from "../../Components/Sort/Sort";
import { Card, Drawer, Pagination} from "antd";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "./productsSlice";
import { fetchFavorites } from "../favorite/FavoritesSlice";
import { loadCart } from "../cart/slices";




export const Main = () => {
  const [openNavbar, setOpenNavbar] = useState(false);

  const { products, loading } = useAppSelector((state) => state.products);

let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const copyParams = new URLSearchParams(searchParams);

  const handleChangeFilters = (key:string, value:string) => {
    if (copyParams.get(key) === value || !value) {
      copyParams.delete(key);
      key === "_order" && copyParams.delete("_sort");
    } else if (key === "_order") {
      copyParams.set("_sort", "price");
      copyParams.set("_order", value);
    } else {
      copyParams.set(key, value);
    }
    if (key !== "_page") {
      copyParams.set("_page", "1");
    }
    setSearchParams(copyParams);
  };

  /* useEffect(() => {
    setPage(1);
  }, [inputName, selectedCategory, sort, price]);
 */
  useEffect(() => {
    // этот код выполнится один раз при создании компонета.
    if (searchParams) {
      dispatch(fetchProducts(searchParams.toString()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  /*  Используем useCallback, чтобы Header не перерисовывался каждый раз, когда мы открываем и закрываем меню, т.к. наш Main перерисовывается, а вместе с ним и все входящие в него функции и компаненты. не стоит увлекаться кешированием функций и комапнентов(особенно таких мелких как Header в нашем случае) с помощью Memo, так как это забивает память.*/
  const handleOpenMenu = /* useCallback */ () => {
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    copyParams.set("_page", "1");
    setSearchParams?.(copyParams);
    
    dispatch(fetchFavorites());
    dispatch(loadCart());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header

        searchParams={searchParams}
        handleChangeFilters={handleChangeFilters}
        handleOpenMenu={handleOpenMenu}
      />
      <Drawer
        title="Категории"
        open={openNavbar}
        placement="left"
        onClose={() => setOpenNavbar(false)}
      >
        <NavBar
          handleChangeFilters={handleChangeFilters}
          searchParams={searchParams}
        />
      </Drawer>

      <Sort
        searchParams={searchParams}
        handleChangeFilters={handleChangeFilters}
      />
      <div className="cardBlock">
        {loading ? (
          <div
            style={{
              display: "flex",
              margin: 50,
              gap: 30,
            }}
          >
            {[...Array(5).keys()].map((i) => (
              <Card 
              key ={i}
              loading style={{ minWidth: 270 }} />
            ))}
          </div>
        ) : (
          <>
            {products.map((el) => (

              <ProductsCard key={el.id} product={el} />
            ))}
          </>
        )}
      </div>
      <Pagination
        current={searchParams.get("_page") ? Number(searchParams.get("_page")) : 1}
        total={23}
        onChange={(page) => handleChangeFilters("_page", String(page))}
      />
    </>
  );
};
