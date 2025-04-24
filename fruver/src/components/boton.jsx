const Boton = ({ texto, color = 'blue', href = '#!', textoColor = 'white' }) => {
  return (
    <a
      className={`waves-effect waves-light btn-large ${color}`}
      href={href}
      style={{ color: textoColor }}
    >
      {texto}
    </a>
  );
};
  

export default Boton;
