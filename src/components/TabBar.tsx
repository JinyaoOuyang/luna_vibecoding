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
    <View style={styles.wrapper}>
      <View style={styles.glowLayer} />
      <View style={styles.topGloss} />
      <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, activeTab === tab.name && styles.tabActive]}
          onPress={() => onTabPress(tab.name)}
        >
          <View style={activeTab === tab.name ? styles.activeGlassHighlight : styles.iconWrapper}>
          <Ionicons
            name={activeTab === tab.name ? tab.iconActive as any : tab.icon as any}
            size={24}
            color={activeTab === tab.name ? colors.tabActive : colors.tabInactive}
          />
          </View>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
    backgroundColor: 'transparent',
  },
  glowLayer: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    bottom: spacing.lg + 6,
    top: spacing.xs + 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.52)',
    shadowColor: '#E2D6DE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 24,
    elevation: 12,
  },
  topGloss: {
    position: 'absolute',
    left: spacing.xl + 10,
    right: spacing.xl + 10,
    top: spacing.xs + 12,
    height: 24,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.55)',
    opacity: 0.95,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#CBBBC4',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 14,
  },
  tab: {
    minWidth: 72,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.96)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.95,
    shadowRadius: 14,
    elevation: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeGlassHighlight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
});
