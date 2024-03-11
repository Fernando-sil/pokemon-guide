// const StyledChart = styled.div`
//   padding: 2rem;
// `;

const darkTypes = ["ghost", "dark"];

import {
  Bar,
  BarChart,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import styled from "styled-components";
import { usePokemonInfo } from "./usePokemonInfo";
import { backGroundColors } from "../../utils/Constants";

function StatsChart() {
  const { isLoading, pokemonInfo } = usePokemonInfo();
  const statsMap = pokemonInfo.stats.map((stat) => ({
    name: stat.stat.name
      .split("-")
      .join(" ")
      .replace(stat.stat.name[0], stat.stat.name[0].toUpperCase()),
    value: stat.base_stat,
  }));
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        title="Stats"
        layout="vertical"
        width={500}
        height={300}
        data={statsMap}
        margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 5,
        }}
      >
        <YAxis dataKey="name" type="category" tick={{ fill: "white" }} />
        <XAxis type="number" key="name" tick={{ fill: "white" }} />
        <Tooltip
          cursor={{ fill: "none" }}
          contentStyle={{
            background: `${
              darkTypes.includes(pokemonInfo.types[0].type.name)
                ? "#8f9497"
                : "#233546"
            }`,
          }}
        />
        {/* <Legend /> */}
        <Bar
          dataKey="value"
          fill={backGroundColors[pokemonInfo.types[0].type.name]}
          activeBar={
            <Rectangle
              fill="white"
              stroke={backGroundColors[pokemonInfo.types[0].type.name]}
            />
          }
          key={statsMap.name}
        >
          <LabelList
            dataKey="value"
            position="right"
            style={{ fill: "white" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsChart;
