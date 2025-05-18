const Search = ({ onBuscar }) => {
  const handleChange = (e) => {
    onBuscar(e.target.value);
  };

  return (
    <div className="nav-wrapper" id="search">
      <form>
        <div className="input-field">
          <input id="search" type="search" onChange={handleChange} />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;
