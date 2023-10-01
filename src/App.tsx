import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import QuizPlay from "./pages/QuizPlay";
import QuizList from "./pages/QuizList";
import ErrorPage from "./pages/Error";
import HighscoreList from "./pages/HighscoreList";
import { createTheme, ThemeProvider } from "@mui/material";
import { deepPurple, indigo } from "@mui/material/colors";

//TODO: Error Page-re gomb, meg vhogy nézzen ki!
//TODO: ha két ugyanolyan választ adok meg AddQuiznél, az errort okoz (valszeg id-index miatt; lehet ink generálni kéne)

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: indigo[300],
      dark: indigo[800],
      contrastText: indigo[50],
    },
    secondary: {
      main: deepPurple[500],
      light: deepPurple[200],
      dark: deepPurple[800],
      contrastText: deepPurple[50],
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/play", element: <QuizPlay /> },
      { path: "/quizes", element: <QuizList /> },
      { path: "/highscores", element: <HighscoreList /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
