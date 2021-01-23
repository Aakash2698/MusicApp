import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import "../../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../../node_modules/dropzone/dist/min/dropzone.min.css";
// import '../../../../dropzone/dist/min/dropzone.min.css';
import randomstring from "randomstring";
import MyCropper from "../image-cropper.jsx";
import Modal from "../Modal";
import "./dropzone.scss";
// import defaultUserImage from "../../../assets/images/defaultAvatar.png";
import Resizer from "react-image-file-resizer";

class Dropzone extends Component {
  myDropzone = null;
  state = {
    isEdit: null,
    originalFile: "",
    fileName: "",
    newFile: "",
    showModal: false,
    preview: "",
    lastImage: "",
    errorMess: false,
    fileSizeErrorMessage: false,
    fileSize: "",
    fileWidth: "",
    fileHeight: "",
    fileType: "",
  };

  componentWillMount() {
    this.props.onRef(this);
    let { isEdit, imageUrl } = this.props;
    if (isEdit) {
      this.setState({
        isEdit: isEdit,
        preview: imageUrl,
        originalFile: imageUrl,
        lastImage: imageUrl,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.preview !== null && typeof nextProps.imageUrl === "string") {
      let { isEdit, imageUrl } = nextProps;

      if (isEdit) {
        this.setState({
          isEdit: isEdit,
          preview: imageUrl,
          originalFile: imageUrl,
          lastImage: imageUrl,
        });
      }
    }

    this.setState({
      errorMess: false,
      fileSizeErrorMessage: false,
    });
  }

  initCallback = (dropzone) => {
    this.myDropzone = dropzone;
  };

  removeFileFromDropzone = (file) => {
    if (this.myDropzone) {
      this.myDropzone.removeAllFiles();
    }
  };

  renameFile = (file, key) => {
    // const newFile = new File([file], randomstring.generate(12) + "." + this.state.fileName.split(".")[1], { type: file.type });
    const newFile = new File(
      [file],
      randomstring.generate(6) +
        (key ? "_" + key : "") +
        "." +
        file.type.split("/")[1],
      { type: file.type }
    );
    return newFile;
  };

  handleDroppedFile(file) {
    this.setState(
      {
        errorMess: false,
        fileSizeErrorMessage: false,
      },
      () => {
        var reader = new FileReader();
        let that = this;
        reader.addEventListener(
          "load",
          function () {
            if (file.accepted) {
              that.setState({
                originalFile: reader.result,
                fileName: file.name,
                showModal: true,
              });
            } else {
              that.setState({
                errorMess: true,
              });
              that.removeFileFromDropzone("");
            }
          },
          false
        );

        if (file && file.size < 5000000) {
          reader.readAsDataURL(file);
          this.setState({
            fileSizeErrorMessage: false,
            fileSize: file.size,
            fileWidth: file.width,
            fileHeight: file.height,
            fileType: file.type.split("/")[1],
          });
        } else {
          this.removeFileFromDropzone("");
          this.setState({
            preview: null,
            fileSizeErrorMessage: true,
          });
        }
      }
    );
  }

  handleCroppedImage = (cropData) => {
    if (cropData) {
      this.removeFileFromDropzone("");
      this.setState(
        {
          preview: cropData.preview,
          showModal: false,
        },
        () => {
          var byteString = atob(cropData.preview.split(",")[1]);
          var mimeString = cropData.preview
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          var file = new File([ia], this.state.fileName, { type: mimeString });
          this.setState({
            newFile: cropData.preview,
          });

          if (file.size > this.state.fileSize) {
            Resizer.imageFileResizer(
              file,
              600,
              300,
              this.state.fileType,
              100,
              0,
              (uri) => {
                var file = new File([uri], this.state.fileName, {
                  type: mimeString,
                });
                this.props.addFile(file, this.props.id);
              },
              "blob"
            );
            // this.props.addFile(image, this.props.id);
          } else {
            this.props.addFile(file, this.props.id);
          }
        }
      );
    }
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  removePreview = () => {
    this.props.removeFile(this.props.id);
    this.setState({
      preview: null,
    });
  };

  toggleModal = () => {
    if (!this.state.isLoading) {
      if (this.state.showModal) {
        this.removeFileFromDropzone("");
        this.setState({
          showModal: !this.state.showModal,
          preview: this.state.lastImage,
          // preview: this.state.originalFile,
        });
        return;
      }
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  };
  render() {
    let { originalFile, newFile, showModal, fileSizeErrorMessage } = this.state;

    var componentConfig = {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "no-url",
    };
    let djsConfig = {
      autoProcesQueue: false,
      maxFiles: 1,
      acceptedFiles: "image/*",
      addRemoveLinks: true,
      dictRemoveFile: "Remove",
      error: false,
    };

    var eventHandlers = {
      init: this.initCallback,
      addedfile: (file) => this.handleDroppedFile(file),
    };
    return (
      <div className="row">
        {this.state.preview ? (
          <div className="col-md-6 el-element-overlay">
            <div className="el-card-item">
              <div className="el-card-avatar el-overlay-1">
                <img
                  src={this.state.preview}
                  alt="no preview"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultUserImage;
                  }}
                />
                <div className="el-overlay scrl-dwn">
                  <ul className="el-info">
                    <li>
                      <button
                        type="button"
                        className="btn-outline btn-danger btn-xs image-popup-vertical-fit p-2 p-l-10 p-r-10"
                        onClick={() => this.openModal()}
                      >
                        <i className="fa fa-edit statusIcon"></i>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn-outline btn-danger btn-xs image-popup-vertical-fit p-2 p-l-10 p-r-10"
                        onClick={() => this.removePreview()}
                      >
                        <i className="fa fa-times statusIcon"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-md-12">
            <DropzoneComponent
              config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
            {this.state.errorMess ? (
              <span className="text-red">Please select only image file.</span>
            ) : (
              ""
            )}
            {fileSizeErrorMessage ? (
              <span className="text-red">
                Please select image less than 5 MB.
              </span>
            ) : (
              ""
            )}
          </div>
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal} modalfrom="dropZone">
            <div>
              <div className="p-20">
                <MyCropper
                  originalUploadFile={originalFile}
                  handleCroppImage={this.handleCroppedImage}
                  newFile={newFile}
                  minCropBoxHeight={this.props.minCropBoxHeight}
                  minCropBoxWidth={this.props.minCropBoxWidth}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
export default Dropzone;
