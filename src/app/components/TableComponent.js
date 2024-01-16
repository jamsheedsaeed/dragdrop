'use client'
// components/Table.js
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);

  const handleDrop = (acceptedFiles) => {
    // Handle file uploads here
    // ...
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Table Number</th>
          <th>Title</th>
          <th>Document</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id}>
            <td>{row.tableNumber}</td>
            <td>{row.title}</td>
            <td>
              <Dropzone onDrop={handleDrop} accept=".pdf,.docx,.txt">
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;