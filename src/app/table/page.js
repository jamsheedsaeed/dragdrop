'use client'
// pages/TablePage.js
import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { useDropzone } from 'react-dropzone';

const TablePage = () => {
  const [data, setData] = useState([
    { tableNumber: 1, title: 'Sample Title 1', file: null },
    { tableNumber: 2, title: 'Sample Title 2', file: null },
    // Add more data as needed
  ]);

  const columns = useMemo(
    () => [
      { Header: 'Table Number', accessor: 'tableNumber' },
      { Header: 'Title', accessor: 'title' },
      {
        Header: 'Document File',
        accessor: 'file',
        Cell: ({ row }) => (
          <FileUploadCell value={row.values.file} setValue={(value) => handleFileUpload(row.index, value)} />
        ),
      },
    ],
    [] // Dependency array for useMemo
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleFileUpload = (index, value) => {
    const updatedData = [...data];
    updatedData[index].file = value;
    setData(updatedData);
  };

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Custom cell for file upload
const FileUploadCell = ({ value, setValue }) => {
  const onDrop = (acceptedFiles) => {
    setValue(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf', // Restrict to PDF files (you can change this based on your requirements)
  });

  return (
    <div {...getRootProps()} style={{ cursor: 'pointer', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {value ? <p>{value.name}</p> : <p>Drag and drop a file here, or click to select</p>}
    </div>
  );
};

export default TablePage;
