import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { CalendarProvider, Calendar } from 'react-native-calendars';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockDailyTips } from '../data/mockData';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekDates = (dateString: string) => {
  const baseDate = new Date(`${dateString}T12:00:00`);
  const dayOfWeek = baseDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const weekStart = new Date(baseDate);
  weekStart.setDate(baseDate.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(weekStart);
    current.setDate(weekStart.getDate() + index);
    return {
      key: toDateString(current),
      dateString: toDateString(current),
      dayNumber: current.getDate(),
      weekday: weekdayLabels[current.getDay()],
    };
  });
};

const calendarTheme = {
  backgroundColor: colors.background,
  calendarBackground: colors.background,
  textSectionTitleColor: colors.textMuted,
  selectedDayBackgroundColor: colors.textPrimary,
  selectedDayTextColor: colors.cardBackground,
  todayTextColor: colors.tertiary,
  todayBackgroundColor: colors.cycle,
  dayTextColor: colors.textPrimary,
  textDisabledColor: colors.textMuted,
  monthTextColor: colors.tertiary,
  arrowColor: colors.textSecondary,
  indicatorColor: colors.textMuted,
  textDayFontWeight: '600',
  textMonthFontWeight: '700',
  textDayHeaderFontWeight: '500',
  textDayFontSize: 18,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 12,
};

interface DailyTipsScreenProps {
  onNavigate: (screen: string) => void;
}

export const DailyTipsScreen: React.FC<DailyTipsScreenProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [savedTips, setSavedTips] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);
  const weekPagerRef = useRef<ScrollView>(null);

  const currentTip = mockDailyTips.find(tip => tip.date === selectedDate) || mockDailyTips[0];
  const weekDates = getWeekDates(selectedDate);
  const adjacentWeeks = useMemo(() => {
    const baseDate = new Date(`${selectedDate}T12:00:00`);
    const previous = new Date(baseDate);
    previous.setDate(baseDate.getDate() - 7);
    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + 7);

    return [
      getWeekDates(toDateString(previous)),
      weekDates,
      getWeekDates(toDateString(next)),
    ];
  }, [selectedDate, weekDates]);

  const shiftWeek = (direction: -1 | 1) => {
    const baseDate = new Date(`${selectedDate}T12:00:00`);
    baseDate.setDate(baseDate.getDate() + direction * 7);
    setSelectedDate(toDateString(baseDate));
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      weekPagerRef.current?.scrollTo({ x: 320, animated: false });
    });
  }, [selectedDate]);

  const handleWeekPagerEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (offsetX < 160) {
      shiftWeek(-1);
      return;
    }

    if (offsetX > 480) {
      shiftWeek(1);
    }
  };

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
        <View style={styles.calendarWrapper}>
          <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
            {isExpanded ? (
              <Calendar
                current={selectedDate}
                firstDay={1}
                enableSwipeMonths
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: colors.textPrimary,
                    selectedTextColor: colors.cardBackground,
                  },
                }}
                theme={calendarTheme as never}
                style={styles.calendar}
              />
            ) : (
              <View style={styles.weekStripContainer}>
                <View style={styles.weekStripHeader}>
                  <TouchableOpacity style={styles.weekArrowButton} onPress={() => shiftWeek(-1)}>
                    <Text style={styles.weekArrowText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.weekMonthLabel}>
                    {new Date(`${selectedDate}T12:00:00`).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                  <TouchableOpacity style={styles.weekArrowButton} onPress={() => shiftWeek(1)}>
                    <Text style={styles.weekArrowText}>›</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  ref={weekPagerRef}
                  horizontal
                  pagingEnabled
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={handleWeekPagerEnd}
                  contentOffset={{ x: 320, y: 0 }}
                >
                  {adjacentWeeks.map((week, index) => (
                    <View key={`week-${index}`} style={styles.weekPage}>
                      <View style={styles.weekDaysRow}>
                        {week.map((item) => {
                          const isSelected = item.dateString === selectedDate;

                          return (
                            <TouchableOpacity
                              key={item.key}
                              style={styles.weekDayItem}
                              onPress={() => setSelectedDate(item.dateString)}
                            >
                              <Text style={[styles.weekDayLabel, isSelected && styles.weekDayLabelSelected]}>
                                {item.weekday}
                              </Text>
                              <View style={[styles.weekDayPill, isSelected && styles.weekDayPillSelected]}>
                                <Text style={[styles.weekDayNumber, isSelected && styles.weekDayNumberSelected]}>
                                  {item.dayNumber}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            <TouchableOpacity style={styles.expandButton} onPress={() => setIsExpanded(prev => !prev)}>
              <Text style={styles.expandButtonText}>{isExpanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
          </CalendarProvider>
        </View>

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
  calendarWrapper: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  calendar: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    paddingBottom: spacing.xs,
  },
  weekStripContainer: {
    paddingTop: spacing.xs,
  },
  weekStripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  weekArrowButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekArrowText: {
    fontSize: 30,
    lineHeight: 30,
    color: colors.textSecondary,
  },
  weekMonthLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.tertiary,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekPage: {
    width: 320,
  },
  weekDayItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  weekDayLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  weekDayLabelSelected: {
    color: colors.tertiary,
  },
  weekDayPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayPillSelected: {
    backgroundColor: colors.textPrimary,
  },
  weekDayNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  weekDayNumberSelected: {
    color: colors.cardBackground,
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  expandButtonText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textMuted,
    lineHeight: 24,
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
