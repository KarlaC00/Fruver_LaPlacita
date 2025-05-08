import React from "react";

const search = () => {
  return (
    <div className="nav-wrapper" id="search">
      <form>
        <div className="input-field">
          <input id="search" type="search" required />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
        </div>
      </form>
    </div>
  );
};
export default search;
