import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({title}) => {
    const chartRef = useRef(null);
    useEffect(() => {
      // 1. 生成实例
      const myChart = echarts.init(chartRef.current);
      // 2. 准备图表参数
      const option = {
        title: {
          text: title,
        },
        xAxis: {
          type: "category",
          data: ["Angular", "React", "Vue"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150],
            type: "bar",
          },
        ],
      };
      // 3. 渲染参数
      myChart.setOption(option);
    }, []);

    return (
      <div>
        <div ref={chartRef} style={{ width: "400px", height: "300px" }} />
      </div>
    );
}
export default BarChart;
