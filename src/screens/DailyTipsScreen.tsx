import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockDailyTips } from '../data/mockData';
import { ExpandableWeekCalendar } from '../components';

interface DailyTipsScreenProps {
  onNavigate: (screen: string) => void;
}

export const DailyTipsScreen: React.FC<DailyTipsScreenProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [savedTips, setSavedTips] = useState<Set<string>>(new Set());

  const currentTip = mockDailyTips.find(tip => tip.date === selectedDate) || mockDailyTips[0];

  const handleSaveTip = (tipId: string) => {
    setSavedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const isSaved = savedTips.has(currentTip.id) || currentTip.isSaved;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.title}>Daily Tips</Text>

        {/* Calendar */}
        <ExpandableWeekCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Tip Content */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>{currentTip.title}</Text>
          <Text style={styles.tipContent}>{currentTip.content}</Text>

          {/* Illustration Placeholder */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <Text style={styles.illustrationEmoji}>🚿</Text>
              <View style={styles.illustrationDecor} />
            </View>
          </View>

          {/* Save Status */}
          {isSaved && (
            <View style={styles.savedBadge}>
              <Text style={styles.savedText}>Saved!</Text>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleSaveTip(currentTip.id)}
            >
              <Text style={[styles.actionIcon, isSaved && styles.actionIconActive]}>
                {isSaved ? '🔖' : '🏷️'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📤</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  tipContainer: {
    marginTop: spacing.lg,
  },
  tipTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 32,
    marginBottom: spacing.md,
  },
  tipContent: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  illustration: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationEmoji: {
    fontSize: 48,
    position: 'absolute',
    left: 20,
    top: 40,
  },
  illustrationDecor: {
    width: 120,
    height: 140,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    opacity: 0.6,
    transform: [{ rotate: '15deg' }],
  },
  savedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  savedText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  checkmark: {
    fontSize: 14,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  actionButton: {
    padding: spacing.sm,
  },
  actionIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  actionIconActive: {
    color: colors.primary,
  },
});
