import React from "react";

interface SvgIconProps {
  name?: string;
  style?: object;
}

const SvgIcon = (props: SvgIconProps = { name: null, style: {} }) => {
  const icon = props.name ? props.name : "unknown";
  return (
    <svg
      className="iconfont-symbol"
      style={{ ...props.style }}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
};

export default SvgIcon;
