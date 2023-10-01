import { useRouteError } from "react-router-dom";
import BackButton from "../components/BackButton";

function ErrorPage() {
  const error: any = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong! :(";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page. :(";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Error Page</h1>
      <h2 style={{ color: "rgb(124, 91, 152)" }}>{message}</h2>
      <BackButton />
    </div>
  );
}

export default ErrorPage;
