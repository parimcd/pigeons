import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Design1 from './pages/Design1';
import Design2 from './pages/Design2';
import Design3 from './pages/Design3';

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Router>
          <Route path="/" element={<Design1 />} />
          <Route path="/design2" element={<Design2 />} />
          <Route path="/design3" element={<Design3 />} />
        </Router>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
