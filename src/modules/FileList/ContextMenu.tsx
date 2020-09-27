import React from "react";
import { Menu, Item } from "react-contexify";

interface ContextMenuProps {
  onCreateFolder: () => void;
  onRefresh: () => void;
}

const ContextMenu = (props: ContextMenuProps) => {
  return (
    <Menu id="menu_id">
      <Item onClick={props.onCreateFolder}>Create folder</Item>
      <Item onClick={props.onRefresh}>Refresh</Item>
    </Menu>
  );
};

export default ContextMenu;
