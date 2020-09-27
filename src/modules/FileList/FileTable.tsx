import React, { useState, useEffect } from "react";
import { useDebounceFn } from "ahooks";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  Table,
  Modal,
  Radio,
  Breadcrumb,
  Divider,
  Button,
  message,
} from "antd";
import { RowSelectionType } from "antd/lib/table/interface";
import mime from "mime-types";
import qs from "qs";

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
import FileUpload from "./FileUpload";
import { getBreadcrumb } from "./common";

interface FileTableProps {
  refreshTimeStamp: number;
  currentDir: string;
  setCurrentDir: (dir: string) => void;
  clearCurrentDir: () => void;
}

const FileTable = (props: FileTableProps & RouteComponentProps) => {
  const [listLoading, setListLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [createFoldModelVisible, setCreateFoldModelVisible] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");

  const refreshList = () => {
    setListLoading(true);

    const params = {
      dir: props.currentDir,
      type: null,
      kw: null,
    };

    const type = props.match?.params?.type;
    if (type !== "all") {
      params.type = type;
    }
    console.log(type, props.match);

    getAllFiles(params).then((res) => {
      setListLoading(false);
      if (resHasList(res)) {
        const { list } = res.data.data;
        setFileList(list);
      }
    });
  };

  const { run: debounceRefreshList } = useDebounceFn(() => refreshList(), {
    wait: 100,
  });

  useEffect(() => {
    debounceRefreshList();
  }, [props.currentDir, props.refreshTimeStamp, props.pathname]);

  useEffect(() => {
    const query = qs.parse(props.search, { ignoreQueryPrefix: true });
    if (query.path) {
      props.setCurrentDir(query.path);
    } else {
      props.setCurrentDir("");
    }
  }, [props.search]);

  const handleClickFileName = (row) => {
    const { dirtype, name } = row;
    const { currentDir } = props;

    // 文件夹
    if (dirtype > 0) {
      const cur = currentDir ? `${currentDir}${name}/` : `${name}/`;
      navigationTo(cur);
      return;
    }

    //  文件
    message.warn("暂时无法预览");
  };

  const navigationTo = (cur) => {
    const path = cur
      ? "/dashboard/disk/all?path=" + encodeURIComponent(cur)
      : "/dashboard/disk/all";
    props.history.push(path);
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b, order) => {
        if (!"".localeCompare) return 0;
        return a.name.localeCompare(b.name);
      },
      showSorterTooltip: false,
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
      render: (text, row) => {
        if (row.dirtype > 0) {
          return "-";
        }
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
    getCheckboxProps: (row) => ({
      disabled: row.dirtype > 0, // Column configuration not to be checked
      name: row.name,
    }),
  };

  const clickBreadcrumb = (item) => {
    navigationTo(item.to);
  };

  return (
    <>
      <div className="mb-20 ">
        <FileUpload />
        <Button
          className="ml-10"
          onClick={() => setCreateFoldModelVisible(true)}
        >
          新建文件夹
        </Button>
      </div>

      <Divider />

      <div className="mb-20 pointer">
        <Breadcrumb>
          {getBreadcrumb(props.currentDir).map((item, index) => {
            return (
              <Breadcrumb.Item
                key={index}
                onClick={() => clickBreadcrumb(item)}
              >
                {item.name}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>

      <MenuProvider id="menu_id" storeRef={false}>
        <Table
          loading={listLoading}
          rowSelection={{
            ...rowSelection,
            type: selectionType as RowSelectionType,
          }}
          onRow={(record) => {
            return {
              onMouseEnter: (event) => {},
            };
          }}
          pagination={false}
          onChange={(pagination, filters, sorter) => {
            console.log(sorter);
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
    refreshTimeStamp: state.common.refreshTimeStamp,
    currentDir: state.common.currentDir,
    search: state.router?.location?.search,
    pathname: state.router?.location?.pathname,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FileTable));
