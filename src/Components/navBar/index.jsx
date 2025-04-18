import { Flex, Input } from "antd";
import "./index.scss";
export const NavBar = ({
  handleChangeCategory,
  selectedCategory,
  setPrice,
  price,
}) => {
  return (
    <>
      <div className="category">
        <div
          onClick={() => handleChangeCategory("phone")}
          className={selectedCategory === "phone" ? "active" : ""}
        >
          Телефоны
        </div>
        <div
          onClick={() => handleChangeCategory("laptop")}
          className={selectedCategory === "laptop" ? "active" : ""}
        >
          Ноутбуки
        </div>
        <div
          onClick={() => handleChangeCategory("monitor")}
          className={selectedCategory === "monitor" ? "active" : ""}
        >
          Мониторы
        </div>
      </div>
      <div className="priceBlock">
        <h3>Цена</h3>
        <Flex gap="middle">
          <Input
            onChange={(e) => setPrice({ ...price, priceFrom: e.target.value })}
            placeholder="От"
          />
          -
          <Input
            onChange={(e) => setPrice({ ...price, priceTo: e.target.value })}
            placeholder="До"
          />
        </Flex>
      </div>
    </>
  );
};
