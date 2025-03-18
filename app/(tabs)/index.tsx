import { FlatList, StyleSheet, ListRenderItem } from 'react-native';
import moment from 'moment';
import "react-native-devsettings";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

type ItemExpenses = {
  amount: number;
  category: string;
  date: string;
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
  const expensesList: ListRenderItem<ItemExpenses> = ({ item, index }) => {
    return (
      <View
        style={styles.item}
      >
        <View style={styles.itemName}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <Text style={styles.date}>{moment(item.date).format('DD/MM/YYYY')}</Text>
        </View>
        <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={expensesList}
        keyExtractor={item => item.date}
        ItemSeparatorComponent={
          (({highlighted}) => (
            <View
              style={[styles.separator]}
            />
          ))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgb(40 40 40)'
  },
  amount: {
    fontSize: 20,
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
