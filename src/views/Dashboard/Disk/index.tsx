import React, { useEffect } from "react";
import { connect } from "react-redux";

import DashboardContent from "src/components/DashboardContent";
import FileTable from "src/modules/FileList/FileTable";

import { myStorage } from "src/service/user";
import { profile } from "src/service/moreu";
import style from "./index.module.css";

function ALL() {
  useEffect(() => {}, []);

  return (
    <DashboardContent>
      <div className={style.page}>
        <FileTable />
      </div>
    </DashboardContent>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ALL);
