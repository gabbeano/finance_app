import { SectionList, StyleSheet } from 'react-native';
import moment from 'moment';
import "react-native-devsettings";

//import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

type ItemExpenses = {
  amount: number;
  category: string;
  date: string;
};

type MonthGroup = {
  month: string;
  data: ItemExpenses[];
};

const expenses: ItemExpenses[] = [
  {
    amount: 22,
    category: 'Supermarket',
    date: '2023-06-21T14:41:01.242164'
  },
  {
    amount: 15,
    category: 'Supermarket',
    date: '2023-06-24T14:41:01.242164'
  },
  {
    amount: 65,
    category: 'Cloth',
    date: '2023-06-26T14:41:01.242164'
  },
  {
    amount: 72,
    category: 'Restaurants',
    date: '2023-07-03T14:41:01.242164'
  }
]

export default function TabOneScreen() {

  const groupedExpenses = () => {
    const groups: Record<string, Record<string, ItemExpenses[]>> = {};
  
    expenses.forEach(item => {
      const year = moment(item.date).format('YYYY');
      const month = moment(item.date).format('MMMM');
  
      if (!groups[year]) groups[year] = {};
      if (!groups[year][month]) groups[year][month] = [];
      groups[year][month].push(item);
    });
  
    const sections = Object.keys(groups).map(year => ({
      title: year,
      data: Object.keys(groups[year]).map(month => ({
        month,
        data: groups[year][month],
      })),
    }));
  
    return sections;
  };

  const expensesList = (item: ItemExpenses, index: number) => (
    <View
      key={item.date + index}
      style={[styles.item, styles.containerText]}
    >
      <View style={styles.itemName}>
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.date}>{moment(item.date).format('DD/MM/YYYY')}</Text>
      </View>
      <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
    </View>
  );

  const renderMonth = ({ item }: { item: MonthGroup }) => {
    const summ = item.data.reduce((a, b) => a + b.amount, 0);

    return (
      <>
        <View style={[styles.monthTitleContainer, styles.containerText]}>
          <Text style={styles.monthTitle}>{item.month}</Text>
          <Text style={styles.monthTitle}>{summ.toFixed(2)}</Text>
        </View>
        {item.data.map((exp: ItemExpenses, i: number) => 
          expensesList(exp, i)
        )}
      </>
    )};

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedExpenses()}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.yearTitle}>{title}</Text>
        )}
        renderItem={renderMonth}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
  },
  yearTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#323232',
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  monthTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#323232',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(40 40 40)'
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(40 40 40)'
  },
  date: {
    fontSize: 12,
    marginTop: 3,
    color: 'rgb(120 120 120)'
  },
  container: {
    flex: 1,
  },
  containerText: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  separator: {
    backgroundColor: '#eee',
    height: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(120 120 120)'
  },
});
