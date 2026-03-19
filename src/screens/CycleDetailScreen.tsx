import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ExpandableWeekCalendar } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockCycleData } from '../data/mockData';

interface CycleDetailScreenProps {
  onClose: () => void;
}

export const CycleDetailScreen: React.FC<CycleDetailScreenProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual': return colors.primary;
      case 'follicular': return colors.mood;
      case 'ovulation': return colors.workout;
      case 'luteal': return colors.sleep;
      default: return colors.cycle;
    }
  };

  const getPhaseLabel = (phase: string) => {
    return phase.charAt(0).toUpperCase() + phase.slice(1) + ' Phase';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cycle</Text>
        </View>

        <ExpandableWeekCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Cycle Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View style={styles.progressInner}>
              <Text style={styles.dayText}>Day {mockCycleData.currentDay}</Text>
              <Text style={styles.cycleText}>of {mockCycleData.cycleLength}</Text>
            </View>
          </View>
        </View>

        {/* Phase Info */}
        <View style={styles.phaseContainer}>
          <View style={[styles.phaseBadge, { backgroundColor: getPhaseColor(mockCycleData.phase) }]}>
            <Text style={styles.phaseText}>{getPhaseLabel(mockCycleData.phase)}</Text>
          </View>
        </View>

        {/* Cycle Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cycle Overview</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Current Phase</Text>
            <Text style={styles.infoValue}>{getPhaseLabel(mockCycleData.phase)}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Flow Status</Text>
            <Text style={styles.infoValue}>
              {mockCycleData.flowStatus === 'none' ? 'No Flow' : 
                mockCycleData.flowStatus.charAt(0).toUpperCase() + mockCycleData.flowStatus.slice(1)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Next Period</Text>
            <Text style={styles.infoValue}>{mockCycleData.nextPeriodDate}</Text>
          </View>
        </View>

        {/* Log Symptoms Button */}
        <TouchableOpacity style={styles.logButton}>
          <Text style={styles.logButtonText}>Log Symptoms</Text>
        </TouchableOpacity>
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
  progressCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cycleText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  phaseContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phaseBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  phaseText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.cardBackground,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDF5F7',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  logButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.cardBackground,
  },
});
