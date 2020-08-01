import React from 'react';
import './App.css';

import { JsWebm } from 'jswebm';

function App() {
  const [demuxer, setDemuxer] = React.useState(null);

  React.useEffect(() => {
    fetch('/video/Big_Buck_Bunny_4K.webm')
      .then(res => res.arrayBuffer())
      .then((buffer) => {
        const demuxer = new JsWebm();
        demuxer.queueData(buffer);
        while (!demuxer.eof) {
          demuxer.demux();
        }
        setDemuxer(demuxer);
      })
      .catch(console.log);
  }, []);

  const renderDemuxer = () => (
    <>
      <h3>Demuxer State:</h3>
      <div>
        <table className="demuxer-table">
          <tbody>
            <tr>
              <th>State</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>videoFormat</td>
              <td>
                <pre>
                  {JSON.stringify(demuxer.videoFormat, null, 2)}
                </pre>
              </td>
            </tr>
            <tr>
              <td>audioCodec</td>
              <td>{demuxer.audioCodec}</td>
            </tr>
            <tr>
              <td>videoPackets</td>
              <td>{demuxer.videoPackets.length}</td>
            </tr>
            <tr>
              <td>audioPackets</td>
              <td>{demuxer.audioPackets.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="App">
      <h1>Jswebm</h1>
      {demuxer ? renderDemuxer() : 'Loading...'}
    </div>
  );
}

export default App;
