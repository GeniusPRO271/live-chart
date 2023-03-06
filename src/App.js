// MOST OF THE IMPORTS ARE FOR TABLE AND CHART MOSTLY STYLE
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import moment from 'moment';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  // REACT HOOKS TO STORE STATES
  const chartBoth = useRef(null); // CHART REF
  const [chartInstance, setChartInstance] = useState(null); // ACTIVE CHART
  const [simulationIntervalId, setSimulationIntervalId] = useState(null); // INTERVAL
  const [startTime, setStartTime] = useState(null); // SIMULATION TIME
  const [rows, setRow] = useState([]); // ROWS FOR TABLE
  const [dataUSD, setDataUSD] = useState([]); // DATA OF THE USD LINE
  const [dataEUR, setDataEUR] = useState([]); // DATA OF THE EUR LINE
  const [dayCount, setDayCount] = useState(1); // COUNT OF DAYS

  // useEffect to initialize the chart with defuld data, also delete everything at end
  useEffect(() => {
    const ctx = chartBoth.current.getContext('2d');

    // Create a new chart instance
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 0'],
        datasets: [
          {
            label: 'EUR',
            data: [1.06],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBorderWidth: 5,
            tension: 0.1,
          },
          {
            label: 'GBP',
            data: [1.2],
            fill: false,
            borderColor: 'rgb(192, 75, 75)',
            pointBorderWidth: 5,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
        },
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });

    // Save the chart instance to state
    setChartInstance(chart);

    // Clean up the interval and destroy the chart when the component unmounts
    return () => {
      clearInterval(simulationIntervalId);
      chart.destroy();
      setChartInstance(null);
      setSimulationIntervalId(null);
      setStartTime(null);
      setDayCount(0);
    };
  }, []);

  // FORMULA ASKED TO USE FOR THE TASK  C = C * (1 + k * (random - 0.5));
  function calculateFormula(C) {
    let k = 0.02;
    let random = Math.random();
    C = C * (1 + k * (random - 0.5));
    return C;
  }

  // Update the chart instance with new data
  function updateChart0(day) {
    const newLabel = `Day ${day}`;
    const newData = [
      ...chartInstance.data.datasets[0].data,
      calculateFormula(chartInstance.data.datasets[0].data[day - 1]),
    ];
    setDataEUR(chartInstance.data.datasets[0].data);
    // Update the chart instance
    setChartInstance((prevInstance) => {
      if (!prevInstance.data.labels.includes(newLabel)) {
        prevInstance.data.labels.push(newLabel);
      }
      console.log(prevInstance.data.labels);
      prevInstance.data.datasets[0].data = newData;
      prevInstance.update();
      return prevInstance;
    });
  }
  function updateChart1(day) {
    const newLabel = `Day ${day}`;
    const newData = [
      ...chartInstance.data.datasets[1].data,
      calculateFormula(chartInstance.data.datasets[1].data[day - 1]),
    ];
    setDataUSD(chartInstance.data.datasets[1].data);
    // Update the chart instance
    setChartInstance((prevInstance) => {
      if (!prevInstance.data.labels.includes(newLabel)) {
        prevInstance.data.labels.push(newLabel);
      }
      console.log(prevInstance.data.labels);
      prevInstance.data.datasets[1].data = newData;
      prevInstance.update();
      return prevInstance;
    });
  }

  // Start the simulation and update the labels every day
  const startSimulation = () => {
    let day = dayCount;
    // Start the simulation
    setStartTime(moment());
    const intervalId = setInterval(() => {
      day = day + 1;
      console.log(day);
      updateChart0(day);
      updateChart1(day);
    }, 1000); // Change the interval time to whatever you need

    // Save the interval ID to state
    setSimulationIntervalId(intervalId);
  };
  // Stop the simulation and destroy the chart instance
  const stopSimulation = () => {
    setRow(addData());
    clearInterval(simulationIntervalId);
    setDayCount(
      parseInt(
        chartInstance.data.labels[chartInstance.data.labels.length - 1].split(
          ' '
        )[1]
      )
    );
    setSimulationIntervalId(null);
    setStartTime(null);
  };
  // RELOAD PAGE TO RESET THE CHART
  const ResetButton = () => {
    window.location.reload();
  };

  // FUNCTIONS TO ADD DATA TO THE TALBE
  function createData(Day, C0, C1) {
    return { Day, C0, C1 };
  }
  function addData() {
    let row = [];
    dataUSD.map((d, index) => {
      row.push(createData(index, d, dataEUR[index]));
    });
    return row;
  }

  // SCREEN SIZE FOR STYLING
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const chartWidth = screenWidth - 100; // subtract left and right padding
  const chartHeight = screenHeight * 0.9; // subtract top and bottom padding

  return (
    <body className="container p-2">
      <div className="row p-2">
        <canvas
          ref={chartBoth}
          width={chartWidth}
          height={chartHeight}
          style={{ margin: 'auto' }}
        />
      </div>
      <div className="row p-2">
        {!simulationIntervalId && (
          <button
            className="col-5 btn btn-primary w-75"
            onClick={startSimulation}
          >
            Start
          </button>
        )}
        {simulationIntervalId && (
          <button
            className="col-5 btn btn-danger w-75"
            onClick={stopSimulation}
          >
            Stop
          </button>
        )}
        <button className="col-3  w-25  btn btn-warning" onClick={ResetButton}>
          Reset
        </button>
      </div>
      <div className="container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Days</TableCell>
                <TableCell align="center">GBP</TableCell>
                <TableCell align="center">EUR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Day}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Day {row.Day}
                  </TableCell>
                  <TableCell align="center">{row.C0}</TableCell>
                  <TableCell align="center">{row.C1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </body>
  );
}

export default App;
