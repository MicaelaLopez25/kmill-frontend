import { MainComponets } from "./components/MainComponents";
import Footer from "./components/FooterYCss/Footer";
<<<<<<< HEAD
import Cookieiteams from "./components/Cookieitems";

function App() {
  return (
    <div>
      <Cookieiteams />
=======
<<<<<<< HEAD
import ImageCarousel from "./components/imagdesliz";
=======
<<<<<<< HEAD
import Header from "./components/Header";
=======
import { Link, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import ProductosHome from "./components/ProductosHome/ProductosHome";
=======
>>>>>>> 717bdf4eaa95883ba6a7a300013d83dfc4f1cd15
>>>>>>> b6878afa73085f62c5a56aa6946ee773cd5bb003
>>>>>>> b0d66bc4049d08926bc92484d432b4f976b9fbc2

const posts = [
  {
    titulo: "publicidad en contra de pepsi",
    description: "Joylne Cuyoj",
    link: "https://media.istockphoto.com/id/157511634/es/foto/caseras-con-pedacitos-de-chocolate-sobre-blanco-a%C3%A9reos-xxxl.jpg?s=612x612&w=0&k=20&c=er2YzMqo_KX15V7w37_E383WMPOqFbfxzCYtbx8Tubg=",
    parrafo: "Gato coca",
  },
  {
    titulo: "publicidad en contra de pepsi",
    description: "Joylne Cuyoj",
    link: "https://media.istockphoto.com/id/157511634/es/foto/caseras-con-pedacitos-de-chocolate-sobre-blanco-a%C3%A9reos-xxxl.jpg?s=612x612&w=0&k=20&c=er2YzMqo_KX15V7w37_E383WMPOqFbfxzCYtbx8Tubg=",
    parrafo: "Gato coca",
  },
  {
    titulo: "publicidad en contra de pepsi",
    description: "Joylne Cuyoj",
    link: "https://imgs.search.brave.com/1FuzWHjMz6exTyEllwix9wbdH5IpxKT3FoA0yvNslNY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM3Lm1lbWVkcm9p/ZC5jb20vaW1hZ2Vz/L1VQTE9BREVENTU3/LzY2NjkwNDBlZDFm/NjEuanBlZw",
    parrafo: "Gato coca",
  },
];

function App() {
  return (
    <div>
<<<<<<< HEAD
      <ImageCarousel/>
=======
      <Header />
>>>>>>> b6878afa73085f62c5a56aa6946ee773cd5bb003
      <MainComponets />
      <ProductosHome />

      <ul className="grilla-padre">
        {posts.map((elemento, index) => (
<<<<<<< HEAD
          <Post
            description={elemento.description}
            link={elemento.link}
            parrafo={elemento.parrafo}
            titulo={elemento.titulo}
            key={index}
          />
        ))}
      </ul>
=======
          <div key={index}>
            <Post
              description={elemento.description}
              link={elemento.link}
              parrafo={elemento.parrafo}
              titulo={elemento.titulo}
            />
            <Link to={`/cookie/${elemento.titulo}`}>{elemento.titulo} </Link>
          </div>
        ))}
      </ul>

>>>>>>> 717bdf4eaa95883ba6a7a300013d83dfc4f1cd15
      <Footer />
>>>>>>> 0f2731d808969001ecbef6178b5c3f2bb26a996b
    </div>
  );
}

export default App;
