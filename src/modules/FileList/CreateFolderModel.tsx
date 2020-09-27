import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, message } from "antd";
import { connect } from "react-redux";
import { create } from "src/service/folder";
import { resOK } from "../../common/helper";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

interface CreateFolderModelPopOpts {
  currentDir: string;

  title?: string;
  visible: boolean;
  onSuccess: (result: string) => void;
  onCancel: () => void;
}

const CreateFolderModel = (props: CreateFolderModelPopOpts) => {
  const { title = "创建文件夹", visible } = props;

  const formRef = useRef(null);

  useEffect(() => {
    if (visible) {
    }
  }, [visible]);

  const handleSubmit = () => {
    formRef.current
      .validateFields()
      .then((val) => {
        if (val.dir) {
          createNewFold(val.dir);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewFold = (name) => {
    const dir = props.currentDir;
    create({ name, dir }).then((res) => {
      if (resOK(res)) {
        props.onSuccess(dir + name);
        message.success("文件夹创建成功");
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={visible}
      width={450}
      destroyOnClose
      centered
      onOk={() => handleSubmit()}
      onCancel={() => props.onCancel()}
    >
      <Form name="" {...formItemLayout} ref={formRef} initialValues={{}}>
        <Form.Item name="dir" required label="文件夹">
          <Input maxLength={20} placeholder="请输入名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDir: state.common.currentDir,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderModel);
