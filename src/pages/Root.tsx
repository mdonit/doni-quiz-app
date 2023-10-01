import { Outlet } from "react-router";
import { useOutletContext } from "react-router-dom";
import { UpdateQuizList } from "../models";

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export function useQuizList() {
  return useOutletContext<UpdateQuizList>();
}

export default Root;
