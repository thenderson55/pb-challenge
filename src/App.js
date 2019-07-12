import React from 'react';
import RegionSelection from  './components/RegionSelection'
import styled from 'styled-components'

function App() {

  // const { user } = useContext(MyContext);
  const Home = styled.div`
    padding: 20px;
  `;

  return (
    <Home>
      <RegionSelection></RegionSelection>
    </Home>
  );
}

export default App;
