import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ExpandableWeekCalendar } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockWorkoutData } from '../data/mockData';

interface WorkoutDetailScreenProps {
  onClose: () => void;
}

export const WorkoutDetailScreen: React.FC<WorkoutDetailScreenProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');

  const progressPercentage = (mockWorkoutData.caloriesBurned / mockWorkoutData.calorieGoal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Workout</Text>
          <View style={styles.placeholder} />
        </View>

        <ExpandableWeekCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Calorie Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View style={styles.progressInner}>
              <Text style={styles.calorieText}>
                {mockWorkoutData.caloriesBurned}/{mockWorkoutData.calorieGoal}
              </Text>
              <Text style={styles.calorieUnit}>cal</Text>
            </View>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          
          {mockWorkoutData.workouts.map((workout) => (
            <View key={workout.id} style={styles.workoutItem}>
              <View style={styles.workoutIcon}>
                <Text style={styles.workoutEmoji}>{workout.icon}</Text>
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={styles.workoutStats}>
                  <Text style={styles.workoutCalories}>{workout.calories}</Text>
                  <Text style={styles.workoutUnit}>cal</Text>
                  {workout.distance && (
                    <>
                      <Text style={styles.workoutDistance}>{workout.distance}</Text>
                      <Text style={styles.workoutUnit}>{workout.unit}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Scans Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Scans</Text>
            <TouchableOpacity>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          </View>
          
          {mockWorkoutData.scans.map((scan) => (
            <View key={scan.id} style={styles.scanItem}>
              <Text style={styles.scanDate}>{scan.date} {scan.time}</Text>
              <View style={styles.scanValue}>
                <Text style={styles.scanPercentage}>{scan.bodyFatPercentage}%</Text>
                <Text style={styles.scanLabel}>BFP</Text>
              </View>
            </View>
          ))}
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
  progressContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  progressCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: colors.workout,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calorieUnit: {
    fontSize: 16,
    color: colors.workout,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  addButton: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF8F5',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  workoutEmoji: {
    fontSize: 20,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  workoutStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  workoutCalories: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.workout,
  },
  workoutUnit: {
    fontSize: 12,
    color: colors.workout,
    marginLeft: 2,
    marginRight: spacing.sm,
  },
  workoutDistance: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.workout,
  },
  scanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDF8F5',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  scanDate: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  scanValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scanPercentage: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.workout,
  },
  scanLabel: {
    fontSize: 12,
    color: colors.workout,
    marginLeft: spacing.xs,
  },
});
