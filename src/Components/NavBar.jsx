export const NavBar = ({handleChangeCategory, selectedCategory}) => {
  return(
  <div className="navBar">
    <div
      onClick={() => handleChangeCategory("phone")}
      className={selectedCategory === "phone" && "active"}
    >
      Телефоны
    </div>
    <div
      onClick={() => handleChangeCategory("laptop")}
      className={selectedCategory === "laptop" && "active"}
    >
      Ноутбуки
    </div>
    <div
      onClick={() => handleChangeCategory("monitor")}
      className={selectedCategory === "monitor" && "active"}
    >
      Мониторы
    </div>
  </div>
)};
