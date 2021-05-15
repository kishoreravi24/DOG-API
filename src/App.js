import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react'
import './App.css';

function App() {

  const [data, setData] = useState();
  const [haveData, settingData] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3);

  var restApi = new Array();
  restApi = [];


  useEffect(() => {
    setInterval(
      function () {
        fetch('https://dog.ceo/api/breed/germanshepherd/images')
          .then(res => res.json())
          .then(data => {
            let res = Object.values(data)
            setData(res[0]);
            settingData(true);
          })
      }
      , 3000)
  }, [min,max]);

  const next_image = () => {
    let min_inc = max+1;
    let max_inc = min_inc + 3;
    setMin(min_inc);
    setMax(max_inc);
    restApi = [];
    data.slice(min,max).map((res) => {
      restApi.push(res);
    })
  }

  const append_data = () => {
    data.slice(min,max).map((res) => {
      restApi.push(res);
    })
  }

  return (
    <div className="App">
      <div className="tag-name">
        <h1>I love Dog's [bruv 🐶]</h1>
      </div>
      {(haveData) ? append_data() : ''}
      {(haveData) ? (
       restApi.map((res) => {
        return(
          <div className="DisplayCharacter" key={res}>
            <img src={res} width="200px" height="200px" alt="germanShepherd"/>
          </div>
        )
       })
      ) : (
        <div className="loader">
          <Loader active inline='centered' />
        </div>
      )}
      {(haveData) ? <div className="wrapper"><button className="button" onClick={next_image}>Next</button></div> : ''}
    </div>
  );
}

export default App;
