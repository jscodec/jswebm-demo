import React from 'react';
import './App.css';

import JsWebm from 'jswebm';
import MetaTable from './MetaTable';

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

  const renderTracks = () =>
    demuxer.tracks.trackEntries.map((trackEntry, i) => (
      <MetaTable key={i} data={trackEntry} name={`Track ${i + 1}`} />
    ));

  const renderDemuxer = () => (
    <>
      <video controls>
        <source src={videoFile} />
      </video>
      <MetaTable data={demuxer} name="Demuxer" />
      <MetaTable data={demuxer.segmentInfo} name="Segment info" />
      <MetaTable data={demuxer.cues} name="Cues" />
      {renderTracks()}
    </>
  );

  return (
    <div className="App">
      <h1>Jswebm</h1>
      <h2>Demuxing example</h2>
      {demuxer ? renderDemuxer() : 'Loading...'}
    </div>
  );
}

export default App;
