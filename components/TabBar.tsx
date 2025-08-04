import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';




import Colors from '@/constants/Colors';

const tabIcons = [
  {
    id: 0,
    icon: () => <Ionicons name="home-outline" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <Ionicons name="home" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 1,
    icon: () => <SimpleLineIcons name="graph" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <SimpleLineIcons name="graph" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 3,
    icon: () => <MaterialIcons name="category" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <MaterialIcons name="category" size={24} color="rgb(150 150 150)" />
  },
  {
    id: 4,
    icon: () => <Ionicons name="settings-outline" size={24} color="rgb(40 40 40)" />,
    iconFocused: () => <Ionicons name="settings" size={24} color="rgb(150 150 150)" />
  }
]

export default function TabBar({ state, descriptors, navigation }) {
    // const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
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
                        name="pluscircleo"
                        size={60}
                        color='rgb(40 40 40)'
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
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: -30,
    backgroundColor: 'white'
  }
});
