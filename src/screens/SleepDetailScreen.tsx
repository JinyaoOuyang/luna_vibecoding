import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { DateSelector } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockSleepData, generateWeekDays, mockWeeklySleeepStats } from '../data/mockData';

interface SleepDetailScreenProps {
  onClose: () => void;
}

export const SleepDetailScreen: React.FC<SleepDetailScreenProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(20);
  const weekDays = generateWeekDays(selectedDate);
  const todaySleep = mockSleepData[mockSleepData.length - 1];

  const sleepProgress = ((todaySleep.hours * 60 + todaySleep.minutes) / (mockWeeklySleeepStats.goalHours * 60 + mockWeeklySleeepStats.goalMinutes)) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Sleep</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Date Selector */}
        <DateSelector
          weekDays={weekDays}
          onSelectDate={setSelectedDate}
          showBackArrow={true}
        />

        {/* Date Indicators */}
        <View style={styles.dateIndicators}>
          {weekDays.map((day) => (
            <View key={day.date} style={styles.indicatorContainer}>
              <View style={[
                styles.indicator,
                day.isSelected && styles.indicatorSelected
              ]} />
            </View>
          ))}
        </View>

        {/* Main Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View style={styles.progressInner}>
              <View style={styles.timeDisplay}>
                <Text style={styles.timeNumber}>{todaySleep.hours}</Text>
                <Text style={styles.timeUnit}>hr</Text>
                <Text style={styles.timeNumber}>{todaySleep.minutes}</Text>
                <Text style={styles.timeUnit}>min</Text>
              </View>
              <Text style={styles.goalText}>
                Daily Goal {mockWeeklySleeepStats.goalHours}h{mockWeeklySleeepStats.goalMinutes}m
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartYAxis}>
            <Text style={styles.chartLabel}>10h</Text>
            <Text style={styles.chartLabel}>8h</Text>
            <Text style={styles.chartLabel}>6h</Text>
            <Text style={styles.chartLabel}>4h</Text>
            <Text style={styles.chartLabel}>2h</Text>
            <Text style={styles.chartLabel}>0h</Text>
          </View>
          <View style={styles.chartBars}>
            {mockSleepData.map((sleep, index) => {
              const barHeight = ((sleep.hours * 60 + sleep.minutes) / 600) * 150;
              const isToday = index === mockSleepData.length - 1;
              return (
                <View key={index} style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: barHeight },
                      isToday && styles.barToday
                    ]} 
                  />
                  <Text style={styles.barLabel}>
                    {['Mon', 'Tue', 'Today', 'Thu', 'Fri', 'Sat', 'Sun'][index] || `Day ${index + 1}`}
                  </Text>
                  <Text style={styles.barDate}>{18 + index}</Text>
                </View>
              );
            })}
          </View>
          {/* Goal line */}
          <View style={styles.goalLine} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Daily Avg.</Text>
            <View style={styles.statValue}>
              <Text style={styles.statNumber}>{mockWeeklySleeepStats.dailyAverage.hours}</Text>
              <Text style={styles.statUnit}>hr</Text>
              <Text style={styles.statNumber}>{mockWeeklySleeepStats.dailyAverage.minutes}</Text>
              <Text style={styles.statUnit}>min</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>The Shortest</Text>
            <Text style={styles.statSubLabel}>{mockWeeklySleeepStats.shortestSleep.date}</Text>
            <View style={styles.statValue}>
              <Text style={styles.statNumber}>{mockWeeklySleeepStats.shortestSleep.hours}</Text>
              <Text style={styles.statUnit}>hr</Text>
              <Text style={styles.statNumber}>{mockWeeklySleeepStats.shortestSleep.minutes}</Text>
              <Text style={styles.statUnit}>min</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  dateIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.sleep,
  },
  indicatorSelected: {
    backgroundColor: colors.sleep,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: colors.sleep,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    alignItems: 'center',
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeNumber: {
    fontSize: 36,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeUnit: {
    fontSize: 16,
    color: colors.sleep,
    marginLeft: 2,
    marginRight: spacing.sm,
  },
  goalText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: spacing.xl,
    position: 'relative',
  },
  chartYAxis: {
    width: 30,
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  chartLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 24,
    backgroundColor: colors.sleep,
    borderRadius: borderRadius.sm,
    opacity: 0.6,
  },
  barToday: {
    opacity: 1,
  },
  barLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  barDate: {
    fontSize: 10,
    color: colors.textMuted,
  },
  goalLine: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: 50,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.textMuted,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statSubLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statUnit: {
    fontSize: 14,
    color: colors.sleep,
    marginLeft: 2,
    marginRight: spacing.xs,
  },
});
