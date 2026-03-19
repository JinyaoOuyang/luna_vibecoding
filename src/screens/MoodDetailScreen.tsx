import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ExpandableWeekCalendar } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockMoodData } from '../data/mockData';

interface MoodDetailScreenProps {
  onClose: () => void;
}

export const MoodDetailScreen: React.FC<MoodDetailScreenProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState('2024-03-20');

  const getMoodColor = (level: number) => {
    if (level >= 70) return colors.mood;
    if (level >= 40) return colors.sleep;
    return colors.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mood</Text>
        </View>

        <ExpandableWeekCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />

        {/* Mood Circle Visualization */}
        <View style={styles.moodCircleContainer}>
          <View style={styles.moodCircle}>
            <View style={[styles.moodFill, { height: `${mockMoodData.averageLevel}%` }]} />
          </View>
        </View>

        {/* Mood Log Section */}
        <View style={styles.moodLogSection}>
          <Text style={styles.sectionTitle}>Mood Log</Text>
          
          {/* Add Mood Button */}
          <TouchableOpacity style={styles.addMoodButton}>
            <Text style={styles.addMoodText}>How do you feel now?</Text>
            <Text style={styles.addMoodIcon}>+</Text>
          </TouchableOpacity>

          {/* Mood Entries */}
          {mockMoodData.entries.map((entry) => {
            const time = new Date(entry.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
            return (
              <View key={entry.id} style={styles.moodEntry}>
                <Text style={styles.entryTime}>{time}</Text>
                <View style={styles.entryIndicator}>
                  <View 
                    style={[
                      styles.moodDot, 
                      { backgroundColor: getMoodColor(entry.level) }
                    ]} 
                  />
                </View>
              </View>
            );
          })}
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
  moodCircleContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  moodCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.mood,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  moodFill: {
    width: '100%',
    backgroundColor: colors.mood,
    opacity: 0.5,
  },
  moodLogSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  addMoodButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  addMoodText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  addMoodIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  moodEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  entryTime: {
    fontSize: 14,
    color: colors.textPrimary,
    width: 80,
  },
  entryIndicator: {
    flex: 1,
    alignItems: 'flex-end',
  },
  moodDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
