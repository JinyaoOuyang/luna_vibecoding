import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockUser, profileMenuItems, profileSettingsItems } from '../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.greeting}>Hey, {mockUser.name}!</Text>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
          </View>
          {mockUser.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>prime</Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {profileMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Items */}
        <View style={styles.menuSection}>
          {profileSettingsItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upgrade Button (for non-premium users) */}
        {!mockUser.isPremium && (
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade my plan</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  premiumBadge: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  menuSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.primary,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.cardBackground,
  },
});
