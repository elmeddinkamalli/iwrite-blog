import React, { Component } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { ReactComponent as UploadIcon } from "../../assets/static/upload.svg";
import { FileUploader } from "react-drag-drop-files";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/actions/ModalActions";
import $axios from "../../helpers/axios";
import { toggleSpinner } from "../../redux/actions/SpinnerAction";
const fileTypes = ["JPG", "PNG", "JPEG"];

class ShareBlogModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      image: null,
      preview: null,
    };

    this.shareBlog = this.shareBlog.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  async uploadImage(file) {
    this.setState({
      image: file,
      preview: URL.createObjectURL(new Blob([file], { type: "image/png" })),
    });
  }

  shareBlog() {
    this.props.toggleSpinner();

    const formData = new FormData();
    formData.append("image", this.state.image);
    if (this.state.title) formData.append("title", this.state.title);
    if (this.state.description)
      formData.append("description", this.state.description);

    $axios
      .post("/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.props.toggleSpinner();
        location.reload();
      })
      .catch((error) => {
        this.props.toggleSpinner();
      });
  }

  render() {
    return (
      <Modal
        show={this.props.modal.show}
        onHide={this.props.toggleModal}
        className="login-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title>Share Blog</Modal.Title>
          <CloseButton onClick={this.props.toggleModal} />
        </Modal.Header>
        <Modal.Body className="pb-4">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                onChange={(e) => {
                  this.setState({
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                className="form-control"
                id="body"
                rows="5"
                placeholder="Enter body"
                onChange={(e) => {
                  this.setState({
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="image">Image Upload</label>
              <FileUploader
                classes={`fileuploader w-100`}
                multiple={false}
                handleChange={this.uploadImage}
                name="file"
                types={fileTypes}
              >
                <div className="w-100 d-flex flex-column justify-content-center align-items-center p-4">
                  <UploadIcon className="mb-4" />
                  <h5>Drag and drop your files here</h5>
                  <p className="m-0">or click to browse</p>
                </div>
              </FileUploader>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.shareBlog} className="btn btn-primary">
            Share
          </button>
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
  toggleModal: toggleModal,
  toggleSpinner: toggleSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareBlogModal);
