import React from 'react';

const skipSet = new Set(['demuxer', 'dataInterface', 'currentElement', 'entries']);

const MetaTable = ({ data }) => (
  <>
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
                    {JSON.stringify(value, null, 2)}
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
  </>
);

export default MetaTable;
