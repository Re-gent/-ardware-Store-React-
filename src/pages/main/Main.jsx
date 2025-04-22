import { useState } from "react";
import { Header } from "../../Components/header/Header";
import { NavBar } from "../../Components/navBar";
import { ProductsCard } from "../../Components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { Sort } from "../../Components/Sort/Sort";
import { Drawer, Pagination } from "antd";

export const Main = ({ searchParams, handleChangeFilters }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };

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
      {loading && <h1>Loading...</h1>}
      <div className="cardBlock">
        {products.map((el) => (
          // @ts-ignore
          <ProductsCard key={el.id} product={el} />
        ))}
      </div>
      <Pagination
        current={searchParams.get("_page")}
        total={22}
        onChange={(page) => handleChangeFilters("_page", page)}
      />
    </>
  );
};
