export const CardHome = ({ title = "", description = "" }) => {
  return (
    <div className="col s12 m4 l4">
      <div className="card center-align z-depth-0" style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        background: 'transparent', 
        boxShadow: 'none', 
        border: 'none' 
      }}>
        <span className="card-title flow-text" style={{ fontWeight: 'bold' }}>{title}</span>
        <div className="card-content flow-text">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};