import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Scenerios from './pages/Scenerios';
import Test from './comps/Test';
import Pricing from './pages/Pricing';
import SingleScenerio from './pages/SingleScenerio';
import Success from './pages/Success';
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home></Home>
          </Layout>
        }
      ></Route>
      <Route path="/user-profile" element={<div>User Profile</div>}></Route>
      <Route
        path="/scenerios"
        element={
          <Layout>
            <Scenerios></Scenerios>
          </Layout>
        }
      ></Route>
      <Route
        path="/test"
        element={
          <Layout>
            <Test></Test>
          </Layout>
        }
      ></Route>
      <Route
        path="/scenerios/:id"
        element={
          <Layout>
            <SingleScenerio></SingleScenerio>
          </Layout>
        }
      ></Route>
      <Route
        path="/pricing"
        element={
          <Layout>
            <Pricing />
          </Layout>
        }
      ></Route>
      <Route
        path="/success"
        element={
          <Layout>
            <Success />
          </Layout>
        }
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
