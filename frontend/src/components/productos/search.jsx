const Search = ({ onBuscar }) => {
  const handleChange = (e) => {
    onBuscar(e.target.value);
  };

  return (
   <div className="nav-wrapper" id="search" style={{ padding: "0 10px" }}>
  <form>
    <div className="input-field" style={{ marginBottom: 0 }}>
      <i className="material-icons prefix" style={{ marginRight: '5px' }}>search</i>
      <input
        id="search"
        type="search"
        required
        onChange={handleChange}
        placeholder="Buscar productos..."
        style={{ paddingLeft: '0px', paddingBottom: '0px' }}
      />
      <label className="label-icon" htmlFor="search"></label>
    </div>
  </form>
</div>


  );
};

export default Search;
