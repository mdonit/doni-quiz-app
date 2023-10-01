import React from "react";
import { createPortal } from "react-dom";

const useModalPortal = (children: React.ReactNode) => {
  const modal = document.getElementById("modal")!;

  return createPortal(children, modal);
};

export default useModalPortal;
