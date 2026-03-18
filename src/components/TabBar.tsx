import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { TabName } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface TabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs: { name: TabName; icon: string; iconActive: string }[] = [
    { name: 'home', icon: 'home-outline', iconActive: 'home' },
    { name: 'tips', icon: 'document-text-outline', iconActive: 'document-text' },
    { name: 'profile', icon: 'person-outline', iconActive: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => onTabPress(tab.name)}
        >
          <Ionicons
            name={activeTab === tab.name ? tab.iconActive as any : tab.icon as any}
            size={24}
            color={activeTab === tab.name ? colors.tabActive : colors.tabInactive}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tab: {
    padding: spacing.sm,
  },
});
