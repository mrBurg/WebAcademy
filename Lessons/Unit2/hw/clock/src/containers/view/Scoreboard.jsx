import React from "react";

import "./style.scss";

export default ({ data, style }) => (
  <div className={`scoreboard ${style}`}>{data}</div>
);
