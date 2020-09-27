import React from "react";
import { Menu, Item } from "react-contexify";

interface ContextMenuProps {
  onCreateFolder: () => void;
  onRefresh: () => void;
}

const ContextMenu = (props: ContextMenuProps) => {
  return (
    <Menu id="menu_id">
      <Item onClick={props.onCreateFolder}>新建文件夹</Item>
      <Item onClick={props.onRefresh}>刷新</Item>
    </Menu>
  );
};

export default ContextMenu;
