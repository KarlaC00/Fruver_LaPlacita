import React from "react";

const search = () => {
    return (
        <div class="nav-wrapper" id="search">
          <form>
            <div class="input-field">
              <input id="search" type="search" required/>
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            </div>
          </form>
        </div>
    );
};
  export default search;