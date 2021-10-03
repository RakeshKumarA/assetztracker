import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { dashboardTable } from "../../reducers/dashboardSlice";

const PieChart = ({ rawData, type, labels }) => {
  const dispatch = useDispatch();

  const randomData = Array.from({ length: rawData.length }, (_, i) => i + 1);

  const random_hex_color_code = () => {
    const m = randomData.map(
      (data) => "#" + (data * 0xfffff * 1000000).toString(16).slice(0, 6)
    );
    return m;
  };

  const data = {
    labels,
    datasets: [
      {
        data:
          type === "assetByStatus"
            ? rawData.map((status) => status.count)
            : type === "assetByCategory"
            ? rawData.map((cat) => cat.count)
            : rawData,
        backgroundColor: random_hex_color_code(),
        borderColor: random_hex_color_code(),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      getElementAtEvent={(elems, event) => {
        const index =
          elems[0] && elems[0].index !== undefined && elems[0].index;

        const indexString = index !== undefined && index.toString();

        if (type === "assetByStatus") {
          const criteria =
            rawData.filter((data) => data.rowindex === indexString)[0] &&
            rawData.filter((data) => data.rowindex === indexString)[0]
              .assetstatus;
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        } else if (type === "assetByCategory") {
          const criteria =
            rawData.filter((data) => data.rowindex === indexString)[0] &&
            rawData.filter((data) => data.rowindex === indexString)[0].type;
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        } else if (type === "assetByPeriod") {
          const criteria =
            index === 0 ? "Daily" : index === 1 ? "Weekly" : "Monthly";
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        }
      }}
      options={{
        // onClick: graphClickEvent,
        maintainAspectRatio: false,
        cutoutPercentage: 85,
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            fontFamily: '"Poppins", "-apple-system", "sans-serif"',
          },
        },
        title: {
          display: true,
          text: type,
          fontSize: 20,
          fontFamily: '"Poppins", "-apple-system", "sans-serif"',
        },
      }}
    />
  );
};

export default PieChart;
