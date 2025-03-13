import React from "react";
import { Outlet } from "react-router-dom";
import WhistleblowerLayout from "../components/whistleblower/WhistleblowerLayout";

const WhistleblowerPortal = () => {
  return (
    <WhistleblowerLayout>
      <Outlet />
    </WhistleblowerLayout>
  );
};

export default WhistleblowerPortal;
