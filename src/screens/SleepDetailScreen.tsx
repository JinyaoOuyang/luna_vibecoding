import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ExpandableWeekCalendar } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockSleepData, mockWeeklySleeepStats } from '../data/mockData';

interface SleepDetailScreenProps {
  onClose: () => void;
}

export const SleepDetailScreen: React.FC<SleepDetailScreenProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalHours, setGoalHours] = useState(mockWeeklySleeepStats.goalHours.toString());
  const [goalMinutes, setGoalMinutes] = useState(mockWeeklySleeepStats.goalMinutes.toString());
  
  const todaySleep = mockSleepData[mockSleepData.length - 1];
  const currentGoalHours = parseInt(goalHours) || 0;
  const currentGoalMinutes = parseInt(goalMinutes) || 0;

  const sleepProgress = Math.min(((todaySleep.hours * 60 + todaySleep.minutes) / (currentGoalHours * 60 + currentGoalMinutes)) * 100, 100);
  
  // Ring dimensions
  const ringSize = 200;
  const strokeWidth = 14;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset = circumference - (circumference * sleepProgress) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sleep</Text>
        </View>

        <ExpandableWeekCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Main Progress Circle - Apple-style dual ring */}
        <TouchableOpacity style={styles.progressContainer} onPress={() => setShowGoalModal(true)} activeOpacity={0.8}>
          <View style={styles.ringWrapper}>
            <Svg width={ringSize} height={ringSize}>
              {/* Background ring (goal - light color, full circle) */}
              <Circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                stroke={colors.sleep}
                strokeWidth={strokeWidth}
                fill="none"
                opacity={0.3}
              />
              {/* Progress ring (actual sleep - dark color, partial arc) */}
              <Circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                stroke={colors.sleep}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progressStrokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${ringSize / 2}, ${ringSize / 2}`}
              />
            </Svg>
            {/* Center content */}
            <View style={styles.progressInner}>
              <View style={styles.timeDisplay}>
                <Text style={styles.timeNumber}>{todaySleep.hours}</Text>
                <Text style={styles.timeUnit}>hr</Text>
                <Text style={styles.timeNumber}>{todaySleep.minutes}</Text>
                <Text style={styles.timeUnit}>min</Text>
              </View>
              <Text style={styles.goalText}>
                Daily Goal {currentGoalHours}h{currentGoalMinutes}m
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Goal Edit Modal */}
        <Modal
          visible={showGoalModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGoalModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowGoalModal(false)}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
              <Text style={styles.modalTitle}>Set Daily Goal</Text>
              <View style={styles.goalInputRow}>
                <View style={styles.goalInputGroup}>
                  <TextInput
                    style={styles.goalInput}
                    value={goalHours}
                    onChangeText={setGoalHours}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <Text style={styles.goalInputLabel}>hours</Text>
                </View>
                <View style={styles.goalInputGroup}>
                  <TextInput
                    style={styles.goalInput}
                    value={goalMinutes}
                    onChangeText={setGoalMinutes}
                    keyboardType="number-pad"
                    maxLength={2}
                  />
                  <Text style={styles.goalInputLabel}>min</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setShowGoalModal(false)}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

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
  progressContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  ringWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    position: 'absolute',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  goalInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  goalInputGroup: {
    alignItems: 'center',
  },
  goalInput: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  goalInputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  modalButton: {
    backgroundColor: colors.sleep,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.full,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.cardBackground,
  },
});
