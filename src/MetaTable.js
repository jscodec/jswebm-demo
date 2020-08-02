import React from 'react';

const skipSet = new Set(['demuxer', 'dataInterface', 'currentElement', 'entries', 'audioPackets', 'videoPackets', 'tempElementHeader']);

const cleanJson = object => {
  const newObject = {};
  for (const key in object) {
    if (skipSet.has(key)) {
      continue;
    }
    if (typeof object[key] !== 'object') {
      newObject[key] = object[key];
    }
  }
  return newObject;
};

function replacer(key, value) {
  // Filtering out properties
  console.log(key, value)
  if (typeof value === 'object') {
    return undefined;
  }
  return value;
}

const MetaTable = ({ data, name }) => (
  <>
    <h3>{name}</h3>
    <div>
      <table className="demuxer-table">
        <tbody>
          <tr>
            <th>State</th>
            <th>Value</th>
          </tr>
          {Object.entries(data).map(([key, value], i) => {
            if (skipSet.has(key)) return null;
            if (typeof value === 'array' || value === null) return;
            if (typeof value === 'object') {
              return (
                <tr key={i}>
                  <td>{key}</td>
                  <td>
                    <pre>
                      {JSON.stringify(cleanJson(value), null, 2)}
                    </pre>
                  </td>
                </tr>
              );
            }
            return (
              <tr key={i}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

export default MetaTable;
