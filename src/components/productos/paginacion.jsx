const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={i === currentPage ? "active light-green darken-4" : "waves-effect"}
        onClick={() => onPageChange(i)}
      >
        <a href="#!">{i}</a>
      </li>
    );
  }

  return (
    <ul className="pagination">
      <li
        className={currentPage === 1 ? "disabled" : "waves-effect"}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <a href="#!">
          <i className="material-icons ">chevron_left</i>
        </a>
      </li>
      {pages}
      <li
        className={currentPage === totalPages ? "disabled" : "waves-effect " }
        onClick={() => onPageChange(currentPage + 1)}
      >
        <a href="#!">
          <i className="material-icons ">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Paginacion;
