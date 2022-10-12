import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Crosshair, Hint, LineSeriesPoint } from 'react-vis';
import moment from 'moment';

type HourlyForecastProps = {
  className?: string;
  data: HourlyForecast[];
};

type StateT = {
  values: ({ x: number; y: number; h: string } & HourlyForecast)[];
  minT: number;
  maxT: number;
};

const HourlyForecast = ({ className, data }: HourlyForecastProps) => {
  const [state, setState] = React.useState<StateT>();

  React.useEffect(() => {
    const values = data.map((forecast, x) => ({
      x,
      y: forecast.temperature,
      h: moment(forecast.time).format('HH') + ' h',
      ...forecast,
    }));
    const maxT = Math.max(...values.map(f => f.y));
    const minT = Math.min(...values.map(f => f.y));
    setState({ values, minT, maxT });
  }, [data]);

  const [index, setIndex] = React.useState<number>();

  const CrosshairData = index ? state?.values[index] : undefined;

  if (!state) return null;
  return (
    <XYPlot //
      height={300}
      width={800}
      className={className}
      yDomain={[state.minT - 2, state.maxT + 2]}
      onMouseLeave={() => setIndex(undefined)}
      //
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Hours" tickFormat={v => state.values[v]?.h} />
      <YAxis title="Temperature" tickFormat={v => `${v} C`} />
      <LineSeries //
        data={state.values}
        color="#2563eb"
        onNearestX={(v, { index }) => setIndex(index)}
      />
      {CrosshairData && (
        <Crosshair values={[CrosshairData]}>
          <div className="bg-white p-4 text-gray-800 w-56">
            <p>Temperature: {CrosshairData.y} C</p>
            <p>Feels like {CrosshairData.feelsLikeTemp} C</p>
            <p>
              Wind: {CrosshairData.windSpeed} m/s, {CrosshairData.windDirString}, max: {CrosshairData.windGust} m/s
            </p>
            <p>Precipitation probability: {CrosshairData.precipProb} %</p>
            <p>Accumulated precipitation: {CrosshairData.precipAccum} mm/h</p>
          </div>
        </Crosshair>
      )}
    </XYPlot>
  );
};

// memo to avoid unnecessary heavy component updates
export default React.memo(HourlyForecast);
