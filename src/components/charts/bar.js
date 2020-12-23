import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Loading } from '../../components/LoadingComponent';
import '../../componentcss/charts.css';
export class bar extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      guideChartData: {
        labels: [],
        datasets: [
          {
            label: 'Total Guides',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            barThickness: 1,
          },
        ],
      },
      vehicleChartData: {
        labels: [],
        datasets: [
          {
            label: 'Total Vehicles',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            barThickness: 1,
          },
        ],
      },
      overallChartData: {
        labels: [],
        datasets: [
          {
            label: 'Total Statistics',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            barThickness: 1,
          },
        ],
      },
      userChartData: {
        labels: [],
        datasets: [
          {
            t: 0,
            label: 'Number Of User per Month',
            data: [],
            borderColor: [],
            borderWidth: 1,
            fill: false,
            barThickness: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.6,
            },
          ],
        },
      },

      lineOptions: {
        maintainAspectRatio: false,
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
              scaleLabel: {
                display: true,
                labelString: 'No. Reg Users',
              },
            },
          ],
        },
      },

      pieOptions: {
        scaleShowLabels: false,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  }

  getData = async () => {
    await axios
      .get('http://localhost:3000/admin/totalRecords')
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          userChartData: {
            ...this.state.userChartData,
            labels: res.data.userData.map((val) => val.month),
            datasets: [
              {
                label: res.data.totalSum[4].value + ' Total Users',
                data: res.data.userData.map((number) => number.count),

                backgroundColor: ['rgba(0, 0, 0, 0.1)'],
                borderColor: [
                  'rgba(66, 170, 255, 1)',
                  'rgba(66, 170, 255, 1)',
                  'rgba(66, 170, 255, 1)',
                  'rgba(66, 170, 255, 1)',
                  'rgba(66, 170, 255, 1)',
                  'rgba(66, 170, 255, 1)',
                ],
                borderWidth: 3,
              },
            ],
          },
          guideChartData: {
            ...this.state.guideChartData,
            labels: res.data.guidesData.map((val) => val.title),
            datasets: [
              {
                label: res.data.totalSum[1].value + ' Total Guides',
                data: res.data.guidesData.map((number) => number.value),
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(111, 66, 193, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(111, 66, 193, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          vehicleChartData: {
            ...this.state.vehicleChartData,
            labels: res.data.transportData.map((val) => val.title),
            datasets: [
              {
                label: res.data.totalSum[0].value + ' Total Vehiles',
                data: res.data.transportData.map((number) => number.value),
                backgroundColor: [
                  'rgba(0, 147, 245, 1)',
                  'rgba(0, 245, 143, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(204, 40, 40, 1)',
                  'rgba(245, 114, 0, 1)',
                  'rgba(111, 66, 193, 1)',
                ],
                borderColor: [
                  'rgba(0, 147, 245, 1)',
                  'rgba(0, 245, 143, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(204, 40, 40, 1)',
                  'rgba(245, 114, 0, 1)',
                  'rgba(111, 66, 193, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },

          overallChartData: {
            ...this.state.overallChartData,
            labels: res.data.totalSum.map((val) => val.title),
            datasets: [
              {
                label: res.data.totalSum.length + ' Overall Stats',
                data: res.data.totalSum.map((number) => number.value),
                backgroundColor: [
                  'rgba(228, 245, 0, 1)',
                  'rgba(24, 0, 245, 1)',
                  'rgba(175, 0, 245, 1)',
                  'rgba(245, 0, 94, 1)',
                  'rgba(245, 98, 0, 1)',
                  'rgba(22, 0, 102, 1)',
                ],
                borderColor: [
                  'rgba(228, 245, 0, 1)',
                  'rgba(24, 0, 245, 1)',
                  'rgba(175, 0, 245, 1)',
                  'rgba(245, 0, 94, 1)',
                  'rgba(245, 98, 0, 1)',
                  'rgba(22, 0, 102, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.loading)
      return (
        <div>
          <Loading />
        </div>
      );
    return (
      <div>
        <h3
          style={{
            fontSize: '38px',
            fontFamily: 'Titillium Web',
            textAlign: 'center',
          }}
        >
          Statistics
        </h3>

        {/* 1st row */}
        <div style={{ margin: '2%' }}> </div>
        <div className="Cahrtrow">
          <div className="Chartcolumn">
            <h3
              style={{
                fontSize: '30px',
                fontFamily: 'Titillium Web',
                textAlign: 'center',
              }}
            >
              Users Stats
            </h3>
            <Line
              data={this.state.userChartData}
              options={this.state.lineOptions}
              height={200}
              width={100}
            />
          </div>
          <div style={{ margin: '2%' }}> </div>
          <div className="Chartrow">
            <div className="Chartcolumn">
              <h3
                style={{
                  fontSize: '30px',
                  fontFamily: 'Titillium Web',
                  textAlign: 'center',
                }}
              >
                Guides Stats
              </h3>
              <Bar
                data={this.state.guideChartData}
                options={this.state.options}
                height={200}
                width={100}
              />
            </div>
            <div style={{ margin: '2%' }}> </div>
            <div className="Chartcolumn">
              <h3
                style={{
                  fontSize: '30px',
                  fontFamily: 'Titillium Web',
                  textAlign: 'center',
                }}
              >
                Vehicles Stats
              </h3>
              <Bar
                data={this.state.vehicleChartData}
                options={this.state.options}
                height={200}
                width={100}
              />
            </div>
          </div>
          {/* row 3 */}
          <div style={{ margin: '2%' }}> </div>
          <div className="Chartrow">
            <div className="Chartcolumn">
              <h3
                style={{
                  fontSize: '30px',
                  fontFamily: 'Titillium Web',
                  textAlign: 'center',
                }}
              >
                Overall Stats
              </h3>
              <Pie
                data={this.state.overallChartData}
                options={this.state.pieOptions}
                height={200}
                width={100}
              />
            </div>
            {/* <div style={{ margin: '2%' }}> </div>
          <div className="Chartcolumn">
            <h3
              style={{
                fontSize: '30px',
                fontFamily: 'Titillium Web',
                textAlign: 'center',
              }}
            >
              Vehicles Stats
            </h3>
            <Bar
              data={this.state.vehicleChartData}
              options={this.state.options}
              height={200}
              width={100}
            />
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default bar;
