import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';
import { WeekDay } from '../types';

interface DateSelectorProps {
  weekDays: WeekDay[];
  onSelectDate: (date: number) => void;
  showBackArrow?: boolean;
  onBack?: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  weekDays,
  onSelectDate,
  showBackArrow = true,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      {showBackArrow && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day.date}
            style={[styles.dayContainer, day.isSelected && styles.dayContainerSelected]}
            onPress={() => onSelectDate(day.date)}
          >
            <Text style={[styles.dateNumber, day.isSelected && styles.dateNumberSelected]}>
              {day.date}
            </Text>
            <Text style={[styles.dayName, day.isSelected && styles.dayNameSelected]}>
              {day.dayName}
            </Text>
            {day.hasData && <View style={[styles.dot, day.isSelected && styles.dotSelected]} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  backButton: {
    paddingHorizontal: spacing.sm,
  },
  backArrow: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  scrollView: {
    flexGrow: 0,
  },
  dayContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  dayContainerSelected: {
    backgroundColor: colors.textPrimary,
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.tertiary,
    marginBottom: 2,
  },
  dateNumberSelected: {
    color: colors.cardBackground,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dayNameSelected: {
    color: colors.cardBackground,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.tertiary,
    marginTop: 4,
  },
  dotSelected: {
    backgroundColor: colors.cardBackground,
  },
});
