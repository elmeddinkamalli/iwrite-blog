import React, { Component } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { togglePopUp } from "../../redux/actions/ModalActions";
import { toggleSpinner } from "../../redux/actions/SpinnerAction";

class ConfirmationPopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.modal.confirmationPopUp}
        onHide={this.props.togglePopUp}
        className="login-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title>Share Blog</Modal.Title>
          <CloseButton onClick={this.props.togglePopUp} />
        </Modal.Header>
        <Modal.Body className="pb-4">
          <h5 className="text-danger">Are you sure?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.togglePopUp}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={this.props.modal.handleConfirmation}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    modal: state.modal,
    spinner: state.spinner,
  };
};

const mapDispatchToProps = {
  togglePopUp: togglePopUp,
  toggleSpinner: toggleSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopUp);
