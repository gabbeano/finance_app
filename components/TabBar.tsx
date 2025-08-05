import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';




import Colors from '@/constants/Colors';

const tabIcons = [
  {
    id: 0,
    icon: () => <MaterialIcons name="home-filled" size={24} color="black" />,
    iconFocused: () => <MaterialIcons name="home-filled" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 1,
    icon: () => <Entypo name="bar-graph" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <Entypo name="bar-graph" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 3,
    icon: () => <MaterialIcons name="category" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <MaterialIcons name="category" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 4,
    icon: () => <MaterialIcons name="settings" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <MaterialIcons name="settings" size={24} color="rgb(150 150 150)" />
  }
]

export default function TabBar({ state, descriptors, navigation }) {
    // const { buildHref } = useLinkBuilder();

  return (
    <View style={
      {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'rgb(40 40 40)'
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        console.log('tabs ', route);

        if (route.name === "addExpense") {
            return (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <View style={[
                      // { borderColor: pressed ? 'rgba(0,0,0,.5)' : 'black' },
                      styles.addButton
                    ]}>
                      <AntDesign
                        name="plus"
                        size={25}
                        color='#fff'
                        // color={Colors[colorScheme ?? 'light'].text}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    </View>
                  )}
                </Pressable>
              </Link>
            )
        }

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={index}
          >

            {tabIcons
              .filter(item => item.id === index)
              .map(item => isFocused ? item.iconFocused() : item.icon()
            )}

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 70,
    height: 70,
    marginTop: -20,
    backgroundColor: 'rgb(40 40 40)'
  }
});
