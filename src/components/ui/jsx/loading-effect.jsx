// Desc: Loading effect component
//import css
import "../css/loading-effect.css";
const loadingEffect = () => {
  return (
    <div className="lds-ripple-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default loadingEffect;
