import React, { useId } from "react";

const Cell = ({ children, ...props }) => {
  let cellId = useId();

  return (
    <span key={cellId} className={`cell ${props.status}`}>
      {children}
    </span>
  );
};

export default Cell;
