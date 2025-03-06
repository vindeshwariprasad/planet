import { useState } from 'react'

import './App.css'
import "./style.css";
function App() {
  

  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);

  const handleMatrixChange = (matrix, setMatrix, row, col, value) => {
    const newMatrix = [...matrix];
    if (!newMatrix[row]) newMatrix[row] = [];
    newMatrix[row][col] = Number(value);
    setMatrix(newMatrix);
  };

  const multiplyMatrices = () => {
    if (colsA !== rowsB) {
      alert("Matrix multiplication is not possible. Columns of A must equal rows of B.");
      return;
    }

    let resultMatrix = Array(rowsA)
      .fill(0)
      .map(() => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          resultMatrix[i][j] += (matrixA[i]?.[k] || 0) * (matrixB[k]?.[j] || 0);
        }
      }
    }
    setResult(resultMatrix);
  };

  return (
    <div className="container">
      <h2 className='header'>Matrix Multiplication Calculator</h2>
      <div className="content">
        <div className="matrix-input">
          <label>A Rows: </label>
          <input type="number" value={rowsA} onChange={(e) => setRowsA(Number(e.target.value))} />
          <label> A Columns: </label>
          <input type="number" value={colsA} onChange={(e) => setColsA(Number(e.target.value))} />
        </div>
        <div className="matrix-input">
          <label>B Rows: </label>
          <input type="number" value={rowsB} onChange={(e) => setRowsB(Number(e.target.value))} />
          <label> B Columns: </label>
          <input type="number" value={colsB} onChange={(e) => setColsB(Number(e.target.value))} />
        </div>
      </div>
      <h3>Matrix A</h3>
      <div className="matrix-container">
        {Array.from({ length: rowsA }).map((_, i) => (
          <div key={i} className="matrix-row">
            {Array.from({ length: colsA }).map((_, j) => (
              <input
                key={j}
                type="number"
                onChange={(e) => handleMatrixChange(matrixA, setMatrixA, i, j, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <h3>Matrix B</h3>
      <div className="matrix-container">
        {Array.from({ length: rowsB }).map((_, i) => (
          <div key={i} className="matrix-row">
            {Array.from({ length: colsB }).map((_, j) => (
              <input
                key={j}
                type="number"
                onChange={(e) => handleMatrixChange(matrixB, setMatrixB, i, j, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="multiply-button" onClick={multiplyMatrices}>Multiply</button>
      <h3>Result</h3>
      <div className="matrix-container">
        {result.length > 0 &&
          result.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((val, j) => (
                <span key={j} className="matrix-cell">{val}</span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App
