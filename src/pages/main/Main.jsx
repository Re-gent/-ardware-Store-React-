import { useState } from "react";
import { Header } from "../../Components/header/Header";
import { NavBar } from "../../Components/navBar";
import { ProductsCard } from "../../Components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { Sort } from "../../Components/Sort/Sort";
import { Drawer, Pagination } from "antd";

export const Main = ({
  handInput,
  handleChangeCategory,
  selectedCategory,
  handleChangeSort,
  sort,
  setPrice,
  price,
  setPage,
  page
}) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  // @ts-ignore
  const { products, loading } = useSelector((state) => state.products);

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <>
      <Header handInput={handInput} handleOpenMenu={handleOpenMenu} />
      <Drawer
        title="Категории"
        open={openNavbar}
        placement="left"
        onClose={() => setOpenNavbar(false)}
      >
        <NavBar
          setPrice={setPrice}
          price={price}
          handleChangeCategory={handleChangeCategory}
          selectedCategory={selectedCategory}
        />
      </Drawer>

      <Sort sort={sort} handleChangeSort={handleChangeSort} />
      {loading && <h1>Loading...</h1>}
      <div className="cardBlock">
        {products.map((el) => (
          // @ts-ignore
          <ProductsCard key={el.id} product={el} />
        ))}
      </div>
      <Pagination current ={page} total={22} onChange={(page) => setPage(page)} />
    </>
  );
};
