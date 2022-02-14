import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './ChartWhiteStyles';
import {Colors, Metrics} from './../../theme';
import {BarChart} from 'react-native-chart-kit';

export default function ChartWhiteView(props) {
  const {data} = props;

  let earningData = [];
  // get value from data push into array
  data &&
    data.map((item) => {
      earningData.push(item.earning);
    });

  let earningDate = [];
  // get value from data push into array
  data &&
    data.map((item) => {
      earningDate.push(item.day);
    });

  const barData = {
    labels: earningDate,
    datasets: [
      {
        data: earningData,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'red',
    backgroundGradientFrom: Colors.background.secondary,
    backgroundGradientTo: Colors.background.secondary,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: () => Colors.text.accent,
    labelColor: (opacity = 1) => Colors.text.primary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <BarChart
      // style={graphStyle}
      data={barData}
      width={Metrics.screenWidth}
      height={220}
      // yAxisLabel={'$'}
      chartConfig={chartConfig}
      withInnerLines={true}
      showBarTops={true}
      showValuesOnTopOfBars={false}
    />
  );
}
