import React, { useEffect } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import DashboardContent from "src/components/DashboardContent";
import FileUpload from "src/modules/FileList/FileUpload";
import FileTable from "src/modules/FileList/FileTable";

import { myStorage } from "src/service/user";
import { profile } from "src/service/moreu";
import style from "./index.module.css";

function ALL() {
  useEffect(() => {
    myStorage().then((res) => {});
    profile().then((res) => {});
  }, []);

  return (
    <DashboardContent>
      <div className={style.page}>
        <FileUpload />

        <FileTable />

        {/*<input*/}
        {/*  type="file"*/}
        {/*  onChange={(e) => {*/}
        {/*    console.log(e.target.files);*/}
        {/*    //*/}
        {/*    // upload(e.target.files[0], "")*/}
        {/*    //   .then((res) => {})*/}
        {/*    //   .catch((e) => {});*/}
        {/*  }}*/}
        {/*/>*/}
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
