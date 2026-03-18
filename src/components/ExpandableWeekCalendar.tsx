import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar, CalendarProvider } from 'react-native-calendars';
import { borderRadius, colors, spacing } from '../theme/colors';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEK_PAGE_WIDTH = 320;

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

interface ExpandableWeekCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const ExpandableWeekCalendar: React.FC<ExpandableWeekCalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const weekPagerRef = useRef<ScrollView>(null);
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
  }, [selectedDate]);

  const shiftWeek = (direction: -1 | 1) => {
    const baseDate = new Date(`${selectedDate}T12:00:00`);
    baseDate.setDate(baseDate.getDate() + direction * 7);
    onDateChange(toDateString(baseDate));
  };

  useEffect(() => {
    if (!isExpanded) {
      requestAnimationFrame(() => {
        weekPagerRef.current?.scrollTo({ x: WEEK_PAGE_WIDTH, animated: false });
      });
    }
  }, [selectedDate, isExpanded]);

  const handleWeekPagerEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (offsetX < WEEK_PAGE_WIDTH / 2) {
      shiftWeek(-1);
      return;
    }

    if (offsetX > WEEK_PAGE_WIDTH * 1.5) {
      shiftWeek(1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <CalendarProvider date={selectedDate} onDateChanged={onDateChange}>
        {isExpanded ? (
          <Calendar
            current={selectedDate}
            firstDay={1}
            enableSwipeMonths
            onDayPress={(day) => onDateChange(day.dateString)}
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
              contentOffset={{ x: WEEK_PAGE_WIDTH, y: 0 }}
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
                          onPress={() => onDateChange(item.dateString)}
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
        <TouchableOpacity style={styles.expandButton} onPress={() => setIsExpanded((prev) => !prev)}>
          <Text style={styles.expandButtonText}>{isExpanded ? '⌃' : '⌄'}</Text>
        </TouchableOpacity>
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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
    width: WEEK_PAGE_WIDTH,
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
});
