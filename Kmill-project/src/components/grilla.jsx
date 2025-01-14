export function Post({ titulo, link, Descripcion, ingredientes }) {
  return (
    <li style={{ listStyle: "none" }}>
      <div className="tarjetita" style={{ marginTop: "30px", marginBottom: "100px" }}>
        <div>
          <img className="img-fluid bordes" src={link} alt={Descripcion} />
          <h2 className="h3">{titulo}</h2>
          <h4 className="h4">Ingredientes:</h4>
          <div className="custom-list-tilde">
            {ingredientes.length > 0 ? (
              ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente.Nombre}</li>
              ))
            ) : (
              <div>No hay ingredientes disponibles.</div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
