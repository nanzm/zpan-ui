import React from "react";
import { Button, Menu, Input, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import FileUpload from "src/components/FileList/FileUpload";
import "./index.scoped.less";

const { Search } = Input;

const Index = () => {
  const menu = (
    <Menu>
      <Menu.Item>个人信息</Menu.Item>
      <Menu.Item>
        {/*<LogoutOutlined />*/}
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="top-container">
      <div className="top-left">
        <FileUpload />
        <Button className="ml-10" onClick={() => {}}>
          新建文件夹
        </Button>
        <Search className="search-input" placeholder="搜索文件" />
      </div>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <div className="user">
          {/*<Avatar icon={<UserOutlined />} />*/}
          <div className="username">
            {/*<UserOutlined />*/}
            <span className="txt">你好，李四</span>
            <CaretDownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Index;
