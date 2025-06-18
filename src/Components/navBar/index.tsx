import { Flex, Form, Input, Select } from "antd";
import "./index.scss";
import { debounce } from "lodash";
import { SearchParamsProps } from "../../types";
import { useGetBrandsQuery } from "../../querys/brandsApi";

export const NavBar = ({
  searchParams,
  handleChangeFilters,
}: SearchParamsProps) => {
  const debouncedHandlerPrice = debounce(
    (key: string, value: string) => handleChangeFilters(key, value),
    700
  );

  //RTK Query API
  const { data, error, isLoading } = useGetBrandsQuery();

  const options = data?.map((brand) => ({ label: brand, value: brand })); // с бекенда

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

      <div>
        {error && <span style={{ color: "red" }}>{"error"}</span>}
        <h3>Бренды</h3>
        <Form.Item layout="vertical">
          <Select
            onSelect={(value) => handleChangeFilters("q", value)}
            loading={isLoading}
            options={options}
          />
        </Form.Item>
      </div>

      <div className="priceBlock">
        <h3>Цена</h3>
        <Flex gap="middle">
          <Input
            onChange={(e) => debouncedHandlerPrice("price_gte", e.target.value)}
            defaultValue={searchParams.get("price_gte") || ""}
            placeholder="От"
          />
          -
          <Input
            onChange={(e) => debouncedHandlerPrice("price_lte", e.target.value)}
            defaultValue={searchParams.get("price_lte") || ""}
            placeholder="До"
          />
        </Flex>
      </div>
    </>
  );
};
