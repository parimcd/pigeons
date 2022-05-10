import React from 'react';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import Layouts from './components/Layouts';
import Design1 from './containers/Design1';
import Design2 from './containers/Design2';
import Design3 from './containers/Design3';
function Routes() {
  return (
    <BrowserRouter>
      <Layouts>
        <Router>
          <Route path="/" element={<Design1 />} />
          <Route path="/design2" element={<Design2 />} />
          <Route path="/design3" element={<Design3 />} />
        </Router>
      </Layouts>
    </BrowserRouter>
  );
}
export default Routes;
