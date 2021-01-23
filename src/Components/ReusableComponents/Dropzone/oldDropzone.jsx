import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import randomstring from "randomstring";
import MyCropper from "../image-cropper.jsx";
class Dropzone extends Component {
  myDropzone = null;
  state = {
    maxFiles: null,
    isEdit: null,
    imageUrl: null,
    showIcon: true,
    maxFileExceed: false,
    originalFile: "",
    // cropData: {},
    // preview: null,
    displaySubmitButton: false,
    displayCropper: false,
    fileName: "",
    newFile: "",
  };
  componentWillMount() {
    this.props.onRef(this);
    let { maxFiles, isEdit, imageUrl } = this.props;
    this.setState({
      maxFiles: maxFiles,
    });
    if (isEdit) {
      this.setState({
        isEdit: isEdit,
        imageUrl: imageUrl,
        showIcon: false,
      });
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      maxFiles: props.maxFiles,
      maxFileExceed: false,
    });
    if (this.state.maxFiles !== props.maxFiles) {
      this.setState({
        showIcon: true,
      });
    }
  }
  initCallback = (dropzone) => {
    this.myDropzone = dropzone;
    if (this.state.isEdit) {
      let url = this.state.imageUrl;
      var mockFile = { name: "Editable file!" };
      dropzone.options.addedfile.call(dropzone, mockFile);
      dropzone.options.thumbnail.call(dropzone, mockFile, url);
    }
  };
  removeFileFromDropzone = (file) => {
    if (this.myDropzone) {
      this.myDropzone.removeAllFiles();
      this.setState({
        originalFile: "",
        displayCropper: false,
        maxFileExceed: false,
        fileName: "",
      });
    }
  };
  renameFile = (file) => {
    const newFile = new File(
      [file],
      randomstring.generate(12) + "." + this.state.fileName.split(".")[1],
      { type: file.type }
    );
    return newFile;
  };

  handleDroppedFile(file) {
    if (this.state.originalFile === "") {
      var reader = new FileReader();
      let that = this;
      reader.addEventListener(
        "load",
        function() {
          that.setState({
            originalFile: reader.result,
            displayCropper: true,
            fileName: file.name,
            maxFileExceed: false,
          });
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.setState({
        maxFileExceed: true,
      });
    }
  }

  handleCroppedImage = (cropData) => {
    if (cropData) {
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
      // var blob = new Blob([ia], { type: mimeString });
      var file = new File([ia], this.state.fileName, { type: mimeString });
      this.setState({
        newFile: cropData.preview,
      });
      this.props.addFile(file, this.props.id);
    }
  };

  hideCropper = (file) => {
    if (file.name === "Editable file!") {
      this.setState({
        originalFile: "",
        maxFileExceed: false,
      });
    } else if (
      this.state.originalFile !== "" &&
      file.name === this.state.fileName
    ) {
      this.setState({
        originalFile: "",
        displayCropper: false,
        maxFileExceed: false,
        fileName: "",
      });
    }
    this.props.removedFile(file, this.props.id);
  };

  render() {
    let {
      maxFiles,
      showIcon,
      maxFileExceed,
      displayCropper,
      originalFile,
      newFile,
    } = this.state;
    var componentConfig = {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: showIcon,
      postUrl: "no-url",
    };
    let djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: false,
      maxFiles: maxFiles,
      acceptedFiles: "image/*",
      dictRemoveFile: "Remove",
    };
    var eventHandlers = {
      init: this.initCallback,
      addedfile: (file) => this.handleDroppedFile(file),
      removedfile: (file) => this.hideCropper(file),
      maxfilesexceeded: (file) => this.removeFileFromDropzone(file),
      // reset:removeAll()
    };
    return (
      <div className="row">
        <div className="col-md-4">
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
          {maxFileExceed && (
            <p className="text-danger">
              Max file upload limit exceeded.You can upload only one image.
            </p>
          )}
        </div>
        <div className="col-md-8">
          {displayCropper ? (
            <MyCropper
              originalUploadFile={originalFile}
              handleCroppImage={this.handleCroppedImage}
              newFile={newFile}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default Dropzone;
