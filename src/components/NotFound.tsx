import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";

const NotFound = ({ history, user: { currentRole } }) => {
  const goBack = () => {
    history.push("/");
  };

  return (
    <div id="notFound">
      <section>
        <Result
          status="404"
          title="404"
          subTitle="对不起，您访问的页面不存在！"
          extra={
            <Button type="primary" onClick={goBack}>
              返回
            </Button>
          }
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NotFound);
