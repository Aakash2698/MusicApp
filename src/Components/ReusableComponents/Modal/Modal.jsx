import React, { Component } from "react";
import "./Modal.scss";
class Modal extends Component {
  componentWillMount() {
    // if (!this.props.modalfrom) {
    document.addEventListener("mousedown", this.handlePopupClick, false);
    // }
  }
  componentWillUnmount() {
    // if (!this.props.modalfrom) {
    document.removeEventListener("mousedown", this.handlePopupClick, false);
    // }
  }
  handlePopupClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    !this.props.preventToggleOnClickOutsideModal && this.props.toggleModal();
  };
  render() {
    let { children, id, title, className } = this.props;

    return (
      <div
        id={id}
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
      >
        <div className={"modal-dialog modal-dialog-centered " + className}>
          <div ref={(node) => (this.node = node)} className="modal-content">
            {title && (
              <div className="modal-header">
                <h4 className="modal-title d-inline" id="myModalLabel">
                  {title}
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={this.props.toggleModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            {children && <div className="modal-body">{children}</div>}
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
