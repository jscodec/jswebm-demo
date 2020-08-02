import React from 'react';
import './App.css';

import JsWebm from 'jswebm';

const videoFile = `${process.env.PUBLIC_URL}/video/Big_Buck_Bunny_4K.webm`;

function App() {
  const [demuxer, setDemuxer] = React.useState(null);

  React.useEffect(() => {
    fetch(videoFile)
      .then(res => res.arrayBuffer())
      .then((buffer) => {
        const demuxer = new JsWebm();
        demuxer.queueData(buffer);
        while (!demuxer.eof) {
          demuxer.demux();
        }
        console.log(demuxer);
        setDemuxer(demuxer);
      })
      .catch(console.log);
  }, []);

  const renderTracks = () => (
    <>
      <h3>Tracks:</h3>
      {demuxer.tracks.trackEntries.map(trackEntry => (
        <table className="demuxer-table">
          <tbody>
            <tr>
              <th>State</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>codecID</td>
              <td>{trackEntry.codecID}</td>
            </tr>
            <tr>
              <td>codecName</td>
              <td>{trackEntry.codecName}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );

  const renderDemuxer = () => (
    <>
      <video controls>
        <source src={videoFile} />
      </video>
      <h3>Basic Meta:</h3>
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
              <td>docType</td>
              <td>{demuxer.docType}</td>
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
        {renderTracks()}
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
