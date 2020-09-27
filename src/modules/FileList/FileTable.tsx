import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Modal, Radio, Divider, Button, message } from "antd";
import { RowSelectionType } from "antd/lib/table/interface";
import mime from "mime-types";

import { MenuProvider } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";

import SvgIcon from "src/components/SvgIcon";
import ContextMenu from "./ContextMenu";
import CreateFolderModel from "./CreateFolderModel";

import { getAllFiles } from "src/service/file";

import { resHasList } from "src/common/helper";
import formatSize from "src/common/size";
import { standardFormat } from "src/common/timeformat";
import { CLEAR_CURRENT_DIR, SET_CURRENT_DIR } from "src/redux/reducer/common";

interface FileTableProps {
  currentDir: string;
  setCurrentDir: (dir: string) => void;
  clearCurrentDir: () => void;
}

const FileTable = (props: FileTableProps) => {
  const [listLoading, setListLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [createFoldModelVisible, setCreateFoldModelVisible] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");

  useEffect(() => {
    refreshList();
  }, [props.currentDir]);

  const refreshList = () => {
    setListLoading(true);

    const params = {
      dir: props.currentDir,
      type: null,
      kw: null,
    };
    getAllFiles(params).then((res) => {
      setListLoading(false);
      if (resHasList(res)) {
        const { list } = res.data.data;
        setFileList(list);
      }
    });
  };

  const handleClickFileName = (row) => {
    const { dirtype, name } = row;
    const { currentDir } = props;

    // 文件夹
    if (dirtype > 0) {
      props.setCurrentDir(currentDir ? `${currentDir}/${name}` : name);
      return;
    }

    //  文件
    message.warn("暂时无法预览");
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      render: (text, row) => {
        let icon = mime.extension(row.type);
        if (row.dirtype > 0) {
          icon = "fold";
        }
        return (
          <div className="pointer" onClick={() => handleClickFileName(row)}>
            <SvgIcon
              name={icon ? icon : null}
              style={{ margin: "0 5px 0 0", fontSize: "20px" }}
            />
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "大小",
      width: 150,
      dataIndex: "size",
      render: (text) => {
        return formatSize(text);
      },
    },
    {
      title: "修改日期",
      width: 250,
      dataIndex: "updated",
      render: (text) => {
        return standardFormat(text);
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const renderCurrentDir = (dir) => {
    if (!dir) return "/";

    const result = dir.split("/").filter((i) => !!i);

    if (result.length <= 0) return null;

    const len = result.length;
    return result.map((i, index) => {
      // if (index === 0) {
      //   return (
      //     <span key={index}>
      //       <span>/</span>
      //       <span>{i}</span>
      //     </span>
      //   );
      // }
      // if (index === len - 1) {
      //   return (
      //     <span key={index}>
      //       <span>/</span>
      //       <span>{i}</span>
      //     </span>
      //   );
      // }
      return (
        <span key={index}>
          <span>/</span>
          <span>{i}</span>
        </span>
      );
    });
  };

  return (
    <>
      {/*<Radio.Group*/}
      {/*  onChange={({ target: { value } }) => {*/}
      {/*    setSelectionType(value);*/}
      {/*  }}*/}
      {/*  value={selectionType}*/}
      {/*>*/}
      {/*  <Radio value="checkbox">Checkbox</Radio>*/}
      {/*  <Radio value="radio">radio</Radio>*/}
      {/*</Radio.Group>*/}

      <Button className="ml-10" onClick={() => setCreateFoldModelVisible(true)}>
        new folder
      </Button>

      <Divider />
      <div className="mb-10">
        当前文件路径：{renderCurrentDir(props.currentDir)}
      </div>

      <MenuProvider id="menu_id" storeRef={false}>
        <Table
          loading={listLoading}
          rowSelection={{
            ...rowSelection,
            type: selectionType as RowSelectionType,
          }}
          rowKey="id"
          columns={columns}
          dataSource={fileList}
        />
      </MenuProvider>

      <ContextMenu
        onCreateFolder={() => setCreateFoldModelVisible(true)}
        onRefresh={() => {
          refreshList();
        }}
      />

      <CreateFolderModel
        visible={createFoldModelVisible}
        onSuccess={(str) => {
          setCreateFoldModelVisible(false);
          refreshList();
        }}
        onCancel={() => {
          setCreateFoldModelVisible(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDir: state.common.currentDir,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDir: (dir) => {
      dispatch({ type: SET_CURRENT_DIR, payload: dir });
    },
    clearCurrentDir: () => {
      dispatch({ type: CLEAR_CURRENT_DIR });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileTable);
