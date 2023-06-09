import React from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "../numberFormaterFun";
let multiBarPalette = window.palette;

/**
 * MultiBarChart component
 */

const options = {
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      },
    ],
  },
  responsive: true,
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      display: true,
      labels: {
        font: {
          family: "Lato-Regular",
          size: 14,
          lineHeight: 1.429,
        },
      },
    },
    datalabels: {
      anchor: "end",
      align: "end",
    },
  },
};

class MultiBarChart extends React.Component {
  manupulateData(chartData) {
    var multiBarTempData = {
      labels: [],
      datasets: [],
    };
    let colors = multiBarPalette("cb-Custom1", chartData.length).map(function (
      hex
    ) {
      return "#" + hex;
    });
    chartData.forEach((d, i) => {
      let multiBarTempObj = {
        label: "",
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false,
      };
      let tempdataArr = [];
      let tempdatalabel = [],
        tempVal = "";
      multiBarTempObj.label = d.headerName;
      d.plots.forEach((d1, i) => {
        tempVal = NFormatterFun(d1.value, d1.symbol, "Unit");
        tempVal =
          typeof tempVal == "string"
            ? parseFloat(tempVal.replace(/,/g, ""))
            : tempVal;
        tempdataArr.push(d1.value);
        multiBarTempObj.data = tempdataArr;
        if (d1.name.length > 20) {
          tempdatalabel.push(d1.name.match(/.{1,20}\S+\s*/g));
        } else {
          tempdatalabel.push(d1.name);
        }
      });

      multiBarTempData.labels = tempdatalabel;
      multiBarTempData.datasets.push(multiBarTempObj);
    });
    return multiBarTempData;
  }

  render() {
    let { chartData } = this.props;
    let data = this.manupulateData(chartData);

    /*
     * Function to get the chart label title
     */
    const getMultiBarLabelFilter = (elems) => {
      if (elems[0] !== undefined) {
        console.log("Bar GetLabelFilter: " + elems[0]._view.label);
      } else {
        console.log("Out!");
      }
    };

    if (data) {
      return (
        <Bar
          height={this.props.dimensions.height}
          style={{ fill: "none" }}
          data={data}
          options={options}
          onElementsClick={(elems) => getMultiBarLabelFilter(elems)}
        ></Bar>
      );
    }
    return <div>Loading...</div>;
  }
}

export default MultiBarChart;
