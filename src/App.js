import { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { ProductsCard } from "./Components/productsCard";

const prodacts = [
  {
    id: 1,
    brand: "samsung",
    name: "samsung S25",
    price: 300,
    category: "phone",
    rating: 4,
    img: "https://imgproxy.onliner.by/J-I_JaxOCFhNxvSzK3-cDhPApqa6VesUkw2kOM7BgmA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvN2NiNTY1NzA1/NzlhZTczMjFjZjJh/YTdmMTIxNjlhOTMu/anBn",
  },
  {
    id: 2,
    brand: "Xiaomi",
    name: "Gaming Monitor G27i",
    price: 400,
    category: "monitor",
    rating: 5,
    img: "https://imgproxy.onliner.by/a7O1EDaEHAva_ZCyc8hqdoaF9fdOFk6XFHOGZm9y_rU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMjBkM2Q2MGUy/N2MwYWJlZWQzOGYy/OWZiYzZmYTkzN2Uu/anBn",
  },
  {
    id: 3,
    brand: "Lenovo",
    name: "IdeaPad Slim 3",
    price: 400,
    category: "laptop",
    rating: 5,
    img: "https://imgproxy.onliner.by/paAPlEXfNVZ2Bz7Bc137zVeOFXHxgFzRgUWBXngizWA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvZDMzN2Y2ODY3/MjdjMzM3ZjZhZWEz/ZDMyZmE5ZDQ4Njku/anBn",
  },
  {
    id: 4,
    brand: "apple",
    name: "Iphone 16",
    price: 400,
    category: "phone",
    rating: 5,
    img: "https://imgproxy.onliner.by/J0yb5vVWNyvL2gXu4LKXh36lUpk8sGHBwuuaxazbOR8/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNjVhYTJkNGYx/ZDBjNjRiNjQ1OGQ2/ZGUyOWFmM2IwMDku/anBn",
  },
  {
    id: 5,
    brand: "samsung",
    name: "samsung S24",
    price: 250,
    category: "phone",
    rating: 3,
    img: "https://imgproxy.onliner.by/cYOYwagP3kZNVWgI8oX1h2qcEgqBgVGQgajWbwFeIKs/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYjQ1NmJkN2Ex/ZGI3MTAxNDc5NWFl/MGMzOTQ3NjY4ZGYu/anBn",
  },
  {
    id: 6,
    brand: "Xiaomi",
    name: "Redmi Note 14 Pro+",
    price: 300,
    category: "phone",
    rating: 3,
    img: "https://imgproxy.onliner.by/JRmowke09RylA11Wc2PLtHdjuflFBTm3Msv1CEV1pFU/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNTkxMDMyYTEw/OTE2ZjdjYTY3NzY5/Y2U2YzhmM2FhYjMu/anBn",
  },
  {
    id: 7,
    brand: "Xiaomi",
    name: "Xiaomi 15 Ultra",
    price: 400,
    category: "phone",
    rating: 5,
    img: "https://imgproxy.onliner.by/gqfmp5ZyAwrACWIjdeeDE5S3sPgUDNzNPDdrdf5KU2Q/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYzJhZDQ3YmIy/OTljZDhiOTIxZmMx/YWZmMjFjOGEwYTEu/anBn",
  },
  {
    id: 8,
    brand: "ASUS",
    name: "Vivobook 16X",
    price: 400,
    category: "laptop",
    rating: 5,
    img: "https://imgproxy.onliner.by/a8Qm7NhRtEt0oO4QsyOIuOGeiMXriynrxV3noeDWDhA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYmE2OGE2ODc5/Y2Y2MzAzMjA0MTYw/ODJmMjliNjE5ZTYu/anBn",
  },
  {
    id: 9,
    brand: "ASUS",
    name: "TUF Gaming A15",
    price: 400,
    category: "laptop",
    rating: 5,
    img: "https://imgproxy.onliner.by/TL0isupe2A1D7zjDgmbMzGAltab27faaj2w_fvTq_YA/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvYmMwMzYyMTIx/M2VhNmQ1ZDNkNzYx/NTFlZTQ5YTQ1OTku/anBlZw",
  },
  {
    id: 10,
    brand: "apple",
    name: "Macbook Air 13",
    price: 400,
    category: "laptop",
    rating: 5,
    img: "https://imgproxy.onliner.by/vWmTOLSmgT_th1WW7SauBfMDX27FStMx3fWecwC8MjM/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvOWEwOGU1ZjU0/MDBlNTA4ZmI5NzVi/ZjY5NzY2OWMyYjUu/anBlZw",
  },
  {
    id: 11,
    brand: "Xiaomi",
    name: "2K Monitor A27Qi",
    price: 400,
    category: "monitor",
    rating: 5,
    img: "https://imgproxy.onliner.by/sWD7MBCXIqQfS3AOv0-5ADWwvZ4lHzUDsX9HpKxLlgk/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvNDIyNGZmNWZk/ZWIwMDNhMDI3YTg1/ZDJhMTdmZTJkZWMu/anBn",
  },
  {
    id: 12,
    brand: "LG",
    name: "UltraWide 34WP65C-B",
    price: 400,
    category: "monitor",
    rating: 5,
    img: "https://imgproxy.onliner.by/CP5L1dQIKPJfhFgIxcDm8N_PlA58GB7b-Q6Yha2_Bqo/w:170/h:250/z:2/f:jpg/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvY2F0YWxvZy9k/ZXZpY2Uvb3JpZ2lu/YWwvMzA5NTZmNzhk/ZDJmNjNiYjk0YTdh/ODRjODVmODRjZDgu/anBlZw",
  },
];
function App() {
  const [inputName, setInputName] = useState("");
  const [category, setCategory] = useState("");
  const [openNavbar, setOpenNavbar] = useState(false);

  /* поиск по названию */
  /* const filteredProducts = inputName
    ? prodacts.filter((el) => el.name.includes(inputName))
    : prodacts; */

  /* поиск по категориям в меню и через поиск*/
  const filteredProducts = prodacts.filter(
    (el) =>
      el.category.includes(category) &&
      el.name.toLowerCase().includes(inputName.toLowerCase())
  );

  const handInput = (text) => {
    setInputName(text);
  };

  const handleOpenMenu = () => {
    setOpenNavbar(!openNavbar);
  };
  const handleChangeCategory = (changedCategory) => {
    if (changedCategory === category) {
      setCategory("");
      return
    } 
      setCategory(changedCategory);
  };

  return (
    <div>
      <Header handInput={handInput} handleOpenMenu={handleOpenMenu} />
      {openNavbar && (
        <div className="navBar">
          <div
            onClick={() => handleChangeCategory("phone")}
            className={category === "phone" && "active"}
          >
            Телефоны
          </div>
          <div
            onClick={() => handleChangeCategory("laptop")}
            className={category === "laptop" && "active"}
          >
            Ноутбуки
          </div>
          <div
            onClick={() => handleChangeCategory("monitor")}
            className={category === "monitor" && "active"}
          >
            Мониторы
          </div>
        </div>
      )}
      <div className="cardBlock">
        {filteredProducts.map((el) => (
          <ProductsCard
            key={el.id}
            name={el.name}
            img={el.img}
            rating={el.rating}
            price={el.price}
            brand={el.brand}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
