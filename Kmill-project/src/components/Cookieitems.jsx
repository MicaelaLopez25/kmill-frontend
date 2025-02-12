import React, { useEffect, useState } from "react";
import { Post } from "./grilla";
import Header from "./Header.jsx";
import Footer from "./FooterYCss/Footer";

// Simulando los productos
const posts = [
  {
    id: 1,
    titulo: 1,
    Descripcion: "Joylne Cuyoj",
    link: "/oreocookie.jpg",
  },
  {
    id: 2,
    titulo: 1,
    Descripcion: "Joylne Cuyoj",
    link: "/cookie1.jpg",
  },
  {
    id: 3,
    titulo: 1,
    Descripcion: "Joylne Cuyoj",
    link: "/cokie2.jpg",
  },
  {
    id: 4,
    titulo: "Cookie con chocolina",
    Descripcion: "Joylne Cuyoj",
    link: "/cookienormal.jpg",
  },
  {
    id: 5,
    titulo: 2,
    Descripcion: "f",
    link: "cookiechocolina.jpg",
  },

  { id: 1, titulo: 1 },
  { id: 2, titulo: 2, link: 2 },
  { id: 3, titulo: 1, link: "/cokie2.jpg" },
];

const Cookieitems = () => {
  const [products, setProducts] = useState([]);
  const [ingredientes, setIngredientes] = useState({});
  const [productosCargados, setProductosCargados] = useState(new Set()); // Estado para controlar productos ya cargados
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es Admin
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [productoEditado, setProductoEditado] = useState(null); // Estado para el producto que está siendo editado

  // Función para eliminar duplicados de un array
  const eliminarDuplicados = (array) => {
    return [...new Set(array)];
  };

  // Verificar si el usuario es Admin
  useEffect(() => {
    const role = localStorage.getItem("role"); // Verificamos el rol desde localStorage
    if (role === "Admin") {
      setIsAdmin(true); // Si es Admin, actualizamos el estado
    }
  }, []);

  // Obtener productos
  useEffect(() => {
    fetch("http://127.0.0.1:5000/jsonproducto")
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, []);

  // Obtener ingredientes para cada producto
  useEffect(() => {
    fetch("http://127.0.0.1:5000/ingrediente_producto/")
      .then((data) => data.json())
      .then((data) => setIngredientes(data));
    if (products.length > 0) {
      products.forEach((producto) => {
        // Verificar si ya se cargaron los ingredientes para este producto
        if (!productosCargados.has(producto.id)) {
          fetch(`http://127.0.0.1:5000/ingrediente_producto/${producto.id}`)
            .then((data) => data.json())
            .then((data) => {
              const ingredientesUnicos = eliminarDuplicados(data); // Eliminar duplicados antes de actualizar
              setIngredientes((prev) => ({
                ...prev,
                [producto.id]: ingredientesUnicos, // Guardamos los ingredientes sin duplicados
              }));

              // Marcar este producto como cargado
              setProductosCargados((prev) => new Set(prev.add(producto.id)));
            });
        }
      });
    }
  }, [products, productosCargados]); // Solo se ejecuta cuando `products` cambia

  // Función para manejar el clic en el botón de modificar
  const handleModificarClick = (producto) => {
    setProductoEditado(producto); // Guardamos el producto a editar
    setIsModalOpen(true); // Abrimos el modal
  };

  // Función para manejar el clic en el botón de eliminar
  const handleEliminarClick = (producto) => {
    // Confirmar con el usuario si está seguro de eliminar el producto
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      // Realizar la solicitud DELETE al backend para eliminar el producto
      fetch(`http://127.0.0.1:5000/productoEliminar/${producto.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Producto eliminado exitosamente") {
            // Si la eliminación fue exitosa, actualizamos el estado para remover el producto de la UI
            setProducts((prevProducts) =>
              prevProducts.filter((prod) => prod.id !== producto.id)
            );
            alert("Producto eliminado con éxito");
          } else {
            alert("Hubo un error al eliminar el producto");
          }
        })
        .catch((error) => {
          alert("Hubo un problema con la solicitud de eliminación");
          console.error("Error:", error);
        });
    }
  };
  // Función para manejar los cambios en el formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para guardar los cambios
  const handleGuardarCambios = () => {
    // Realizamos la solicitud PUT al backend para actualizar el producto
    fetch(`http://127.0.0.1:5000/productoActualizar/${productoEditado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: productoEditado.Nombre,
        descripcion: productoEditado.Descripcion,
        precio: productoEditado.Precio,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Si la actualización fue exitosa, actualizamos el estado local de los productos
        if (data.message === "Producto actualizado exitosamente") {
          setProducts((prevProducts) =>
            prevProducts.map((producto) =>
              producto.id === productoEditado.id ? productoEditado : producto
            )
          );
        } else {
          // Si hubo algún error, muestra un mensaje (puedes agregar más lógica aquí)
          alert("Error al actualizar el producto");
        }
      })
      .catch((error) => {
        alert("Hubo un problema con la solicitud de actualización");
        console.error("Error:", error);
      });

    // Cerrar el modal y limpiar el estado
    setIsModalOpen(false);
    setProductoEditado(null);
  };

  // Función para cerrar el modal
  const handleCerrarModal = () => {
    setIsModalOpen(false); // Cerrar el modal sin guardar cambios
    setProductoEditado(null); // Limpiar el producto editado
  };

  return (
    <body className="fondoCookies">
      <Header />
      <div>
        <h1 className="fuente-titulo">Productos</h1>
        <ul className="container-cookies">
          {products.map((elemento, index) => (
            <li style={{ listStyle: "none" }} key={elemento.id || index} className="producto-item">
              <Post
                titulo={elemento.Nombre || "Producto sin título"}
                Descripcion={elemento.Descripcion}
                link={elemento.imagen || "Sin imagen "}
                ingredientes={ingredientes[elemento.id] || []}
              />
              {/* Mostrar el botón solo si es Admin */}
              {isAdmin && (
  <div className="producto-boton-container">
    <button
      className="buttonModificar"
      onClick={() => handleModificarClick(elemento)}
    >
      Modificar Producto
    </button>
    <button
      className="buttonEliminar"
      onClick={() => handleEliminarClick(elemento)} // Función para eliminar el producto
    >
      Borrar Producto
    </button>
  </div>
)}

            </li>
          ))}
        </ul>
      </div>

      {/* Modal para editar producto */}
      {isModalOpen && productoEditado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Modificar Producto</h2>
            <form className="modal-form">
              <div className="modal-input">
                <label>Nombre</label>
                <input
                  type="text"
                  name="Nombre"
                  value={productoEditado.Nombre}
                  onChange={handleInputChange}
                  className="modal-input-field"
                />
              </div>
              <div className="modal-input">
                <label>Descripción</label>
                <input
                  type="text"
                  name="Descripcion"
                  value={productoEditado.Descripcion}
                  onChange={handleInputChange}
                  className="modal-input-field"
                />
              </div>
              <div className="modal-input">
                <label>Precio</label>
                <input
                  type="number"
                  name="Precio"
                  value={productoEditado.Precio}
                  onChange={handleInputChange}
                  className="modal-input-field"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={handleGuardarCambios}
                  className="btnVentana"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={handleCerrarModal}
                  className="btnVentana"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </body>
  );
};

export default Cookieitems;
