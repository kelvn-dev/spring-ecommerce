import MoviePage from "pages/MoviePage";
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import "./App.css"
import Auth from "./pages/AuthPage"
import RouteGuard from "components/RouteGuard";
import { setAuthToken } from "common/helper";
// import HomePage from "./pages/HomePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MoviePage from "./pages/MoviePage";
// dynamic import
// Advanced react pattern
const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
// const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {

  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/auth" element={<Auth></Auth>}></Route>

          <Route element={<Main></Main>}>
            <Route path="/" element={<RouteGuard></RouteGuard>}>
              <Route
                path="/"
                element={
                  <>
                    <Banner></Banner>
                    <HomePage></HomePage>
                  </>
                }
              ></Route>
            </Route>
            
            <Route path="/supercars" element={<RouteGuard></RouteGuard>}>
              <Route path="/supercars" element={<MoviePage></MoviePage>}></Route>
            </Route>

            <Route path="/supercars/:movieId" element={<RouteGuard></RouteGuard>}>
              <Route path="/supercars/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}
              ></Route>
            </Route>

            <Route path="/orders/:orderId" element={<RouteGuard></RouteGuard>}>
              <Route path="/orders/:orderId" element={<OrderPage></OrderPage>}></Route>
            </Route>

          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
