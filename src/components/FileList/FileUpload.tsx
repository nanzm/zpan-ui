import React from "react";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SAGA_UPLOAD } from "src/saga/common";
import { CLEAR_UPLOAD_ERR_MSG } from "src/redux/reducer/common";

interface UploadProps {
  currentDir: string;
  uploading: boolean;
  uploadProgress: number;
  uploadErrorMsg: string;

  uploadFile: (file: string, dir: string) => void;
  clearErrorMsg: () => void;
}

interface UploadState {
  fileList: any;
}

let timer: any = null;

class FileUpload extends React.Component<UploadProps, UploadState> {
  state = {
    fileList: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props, prevProps)) {
      const { uploadErrorMsg } = this.props;
      if (uploadErrorMsg) {
        message.error(uploadErrorMsg);
        this.props.clearErrorMsg();
      }
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const { currentDir } = this.props;

    fileList.forEach((file) => {
      this.props.uploadFile(file, currentDir);
    });
  };

  componentWillUnmount() {
    timer && clearTimeout(timer);
  }

  render() {
    const { fileList } = this.state;

    const props = {
      showUploadList: false,
      fileList,
      beforeUpload: (file) => {
        const { state } = this;
        const newState = { fileList: [...state.fileList, file] };
        this.setState(newState, () => {
          this.handleUpload();
        });
        return false;
      },
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
    };

    const { uploading, uploadProgress } = this.props;
    const progressTxt = `上传中 ${uploadProgress.toFixed(2)}%`;

    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} type="primary" loading={uploading}>
            {uploading ? progressTxt : "上传"}
          </Button>
        </Upload>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentDir: state.common.currentDir,
    uploading: state.common.uploading,
    uploadErrorMsg: state.common.uploadErrorMsg,
    uploadProgress: state.common.uploadProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file, dir) => {
      dispatch({ type: SAGA_UPLOAD, payload: { file, dir } });
    },
    clearErrorMsg: () => {
      dispatch({ type: CLEAR_UPLOAD_ERR_MSG });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
