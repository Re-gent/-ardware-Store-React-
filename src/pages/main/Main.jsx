// @ts-nocheck
import { useCallback, useMemo, useState } from "react";
import { Header } from "../../Components/header/Header";
import { NavBar } from "../../Components/navBar";
import { ProductsCard } from "../../Components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { Sort } from "../../Components/Sort/Sort";
import { Card, Drawer, Pagination, Skeleton } from "antd";

export const Main = ({ searchParams, handleChangeFilters }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);
  /*  Используем useCallback, чтобы Header не перерисовывался каждый раз, когда мы открываем и закрываем меню, т.к. наш Main перерисовывается, а вместе с ним и все входящие в него функции и компаненты. не стоит увлекаться кешированием функций и комапнентов(особенно таких мелких как Header в нашем случае) с помощью Memo, так как это забивает память.*/
  const handleOpenMenu = /* useCallback */ () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <Header
        // @ts-ignore
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
              <Card loading style={{ minWidth: 270 }} />
            ))}
          </div>
        ) : (
          <>
            {products.map((el) => (
              // @ts-ignore
              <ProductsCard key={el.id} product={el} />
            ))}
          </>
        )}
      </div>
      <Pagination
        current={searchParams.get("_page")}
        total={22}
        onChange={(page) => handleChangeFilters("_page", page)}
      />
    </>
  );
};
