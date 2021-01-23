import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class MyCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cropData: {},
      preview: "",
    };
    // Listen for when the user is done cropping
    window.addEventListener(
      "cropend",
      function (e) {
        this.cropUpdate();
      }.bind(this)
    );
    this.cropUpdate = this.cropUpdate.bind(this);
  }
  /**
   * React 'componentDidMount'
   * remove the event listener so it doesnt keep adding on top of itself
   */
  componentDidMount() {
    window.removeEventListener("cropend", this.cropper);
  }
  /**
   * Set the component state based on the current crop selection
   */
  cropUpdate() {
    if (this.cropper) {
      if (typeof this.cropper.getCroppedCanvas() === "undefined") {
        return;
      }

      this.setState({
        cropData: {
          preview: this.cropper.getCroppedCanvas().toDataURL(),
          data: this.cropper.getData(true),
        },
      });
    }
  }
  cropImage = (e) => {
    e.preventDefault();
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    var cropData = {
      preview: this.cropper.getCroppedCanvas().toDataURL(),
      data: this.cropper.getData(true),
    };
    this.setState({
      preview: cropData.preview,
    });
    if (cropData) {
      this.props.handleCroppImage(cropData);
    }
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Cropper
            ref={(cropper) => {
              this.cropper = cropper;
            }}
            src={this.props.originalUploadFile}
            className="cropper "
            viewMode={1}
            style={{ height: "15rem", width: "100%", margin: "0 auto" }}
            minCropBoxWidth={320}
            minCropBoxHeight={200}
            cropBoxResizable={false}
            // Cropper.js options
            aspectRatio={16 / 10}
            guides={false}
            // crop={this.cropImage.bind(this)}
          />
          <button
            onClick={(e) => this.cropImage(e)}
            className="btn btn-danger btn-sm cropper-submit m-t-15	"
          >
            <i className="fa fa-crop"></i> Crop Image
          </button>
        </div>
      </div>
    );
  }
}

export default MyCropper;
