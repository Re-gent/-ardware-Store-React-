import { Flex, Input } from "antd";
import "./index.scss";
import { debounce } from "lodash";
export const NavBar = ({ searchParams, handleChangeFilters }) => {

const debouncedHandlerPrice = debounce(
    (key, value) => handleChangeFilters("key", value),
    700
  );

  return (
    <>
      <div className="category">
        <div
          onClick={() => handleChangeFilters("category", "phone")}
          className={searchParams.get("category") === "phone" ? "active" : ""}
        >
          Телефоны
        </div>
        <div
          onClick={() => handleChangeFilters("category", "laptop")}
          className={searchParams.get("category") === "laptop" ? "active" : ""}
        >
          Ноутбуки
        </div>
        <div
          onClick={() => handleChangeFilters("category", "monitor")}
          className={searchParams.get("category") === "monitor" ? "active" : ""}
        >
          Мониторы
        </div>
      </div>
      <div className="priceBlock">
        <h3>Цена</h3>
        <Flex gap="middle">
          <Input
            onChange={(e) => debouncedHandlerPrice("price_gte", e.target.value)}
            defaultValue={searchParams.get("price_gte")}
            placeholder="От"
          />
          -
          <Input
            onChange={(e) => debouncedHandlerPrice("price_lte", e.target.value)}
            defaultValue={searchParams.get("price_lte")}
            placeholder="До"
          />
        </Flex>
      </div>
    </>
  );
};
