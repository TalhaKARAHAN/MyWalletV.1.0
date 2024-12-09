import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getExpenses } from '../services/service/expenseService';
import styles from '../screenstyles/StatisticsScreenStyles'; // Stil dosyasını import et

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [expenses, setExpenses] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
    incomes: [],
    expenses: [],
  });
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        if (!Array.isArray(data) || data.length === 0) {
          console.error('Veri boş veya uygun formatta değil.');
          return;
        }

        const labels = data.map((item) => item.Tarih || 'N/A');
        const incomes = data.map((item) =>
          item.Tip === 'Gelir' && typeof item.Miktar === 'number' ? item.Miktar : 0
        );
        const expensesOnly = data.map((item) =>
          item.Tip === 'Gider' && typeof item.Miktar === 'number' ? item.Miktar : 0
        );

        const totalIncome = data
          .filter((item) => item.Tip === 'Gelir')
          .reduce((sum, item) => sum + item.Miktar, 0);
        const totalExpense = data
          .filter((item) => item.Tip === 'Gider')
          .reduce((sum, item) => sum + item.Miktar, 0);

        setExpenses(data);
        setGraphData({ labels, incomes, expenses: expensesOnly });
        setPieChartData([
          {
            name: 'Gelir',
            amount: totalIncome,
            color: '#74e5e6',
            legendFontColor: '#E8EAED',
            legendFontSize: 15,
          },
          {
            name: 'Gider',
            amount: totalExpense,
            color: '#e43b2b',
            legendFontColor: '#E8EAED',
            legendFontSize: 15,
          },
        ]);
      } catch (error) {
        console.error('Hata:', error.message);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.GelirGiderID.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Gelir ve Gider Grafiği</Text>
            {graphData.labels.length > 0 && (
              <LineChart
                data={{
                  labels: graphData.labels,
                  datasets: [
                    {
                      data: graphData.incomes,
                      color: (opacity = 1) => `rgba(116, 229, 230, ${opacity})`, // Gelir için soft mavi
                      strokeWidth: 2,
                    },
                    {
                      data: graphData.expenses,
                      color: (opacity = 1) => `rgba(228, 59, 43, ${opacity})`, // Gider için kırmızı
                      strokeWidth: 2,
                    },
                  ],
                  legend: ['Gelir', 'Gider'],
                }}
                width={screenWidth - 30}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: '#1c1c1e',
                  backgroundGradientTo: '#1c1c1e',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#fff',
                  },
                }}
                bezier
                style={styles.chart}
              />
            )}

            <Text style={styles.header}>Gelir ve Gider Oranı</Text>
            {pieChartData.length > 0 && (
              <PieChart
                data={pieChartData}
                width={screenWidth - 30}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.pieChart}
                absolute
              />
            )}
            <Text style={styles.header}>Gelir ve Gider Detayları</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{item.Tarih}</Text>
            <Text style={item.Tip === 'Gelir' ? styles.cardIncome : styles.cardExpense}>
              {item.Tip}: {item.Miktar}₺
            </Text>
            {item.Aciklama ? <Text style={styles.cardDescription}>{item.Aciklama}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}
