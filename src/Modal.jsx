import "./Modal.css";
import useWindowDimensions from "./useWindowDimensions";

export function Modal(props) {
  const { height, width } = useWindowDimensions();
  const handleModalSizing = () => {
    if (width < 1000) {
      return "modal-small";
    } else if (width < 1200) {
      return "modal-mid";
    } else {
      return "modal-main";
    }
  };

  if (props.show) {
    return (
      <div className="modal-background">
        <section className={handleModalSizing()}>
          {props.children}
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
