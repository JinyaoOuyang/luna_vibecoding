import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';

const sleepImage = require('../../assets/Sleep.png');
const moodImage = require('../../assets/Mood.png');
const cycleImage = require('../../assets/Cycle.png');
const workoutImage = require('../../assets/Workout.png');
import { Card } from '../components';
import { colors, spacing, borderRadius } from '../theme/colors';
import { mockSleepData, mockMoodData, mockCycleData, mockWorkoutData } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  const todaySleep = mockSleepData[mockSleepData.length - 1];
  const moodStatus = mockMoodData.averageLevel > 70 ? 'Good' : mockMoodData.averageLevel > 40 ? 'Okay' : 'Low';
  const flowStatus = mockCycleData.flowStatus === 'none' ? 'No Flow' : 
    mockCycleData.flowStatus.charAt(0).toUpperCase() + mockCycleData.flowStatus.slice(1) + ' Flow';
  const workoutTime = {
    hours: Math.floor(mockWorkoutData.caloriesBurned / 200),
    minutes: Math.floor((mockWorkoutData.caloriesBurned % 200) / 3.33),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.dateText}>{dateString}</Text>

        {/* Main Circular Progress - Cycle Visualization */}
        <View style={styles.cycleContainer}>
          <View style={styles.cycleRings}>
            {/* Outer ring - Cycle */}
            <View style={[styles.ring, styles.ringOuter, { borderColor: colors.primary }]} />
            {/* Middle ring - Activity */}
            <View style={[styles.ring, styles.ringMiddle, { borderColor: colors.workout }]} />
            {/* Inner ring - Sleep */}
            <View style={[styles.ring, styles.ringInner, { borderColor: colors.sleep }]} />
            {/* Center */}
            <View style={styles.ringCenter} />
          </View>
        </View>

        {/* Stats Cards Grid */}
        <View style={styles.cardsGrid}>
          {/* Sleep Card */}
          <Card 
            style={styles.card}
            onPress={() => onNavigate('sleep')}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Sleep</Text>
              </View>
              <View style={styles.cardImageRow}>
                <Image source={sleepImage} style={styles.cardImage} resizeMode="contain" />
              </View>
              <View style={styles.cardBottomRow}>
                <View style={styles.cardValue}>
                <Text style={styles.valueNumber}>{todaySleep.hours}</Text>
                <Text style={styles.valueUnit}>hr</Text>
                <Text style={styles.valueNumber}>{todaySleep.minutes}</Text>
                <Text style={styles.valueUnit}>min</Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Mood Card */}
          <Card 
            style={styles.card}
            onPress={() => onNavigate('mood')}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Mood</Text>
              </View>
              <View style={styles.cardImageRow}>
                <Image source={moodImage} style={styles.cardImage} resizeMode="contain" />
              </View>
              <View style={styles.cardBottomRow}>
                <Text style={styles.moodText}>{moodStatus}</Text>
              </View>
            </View>
          </Card>

          {/* Cycle Card */}
          <Card 
            style={{...styles.card, backgroundColor: '#FDF5F7'}}
            onPress={() => onNavigate('cycle')}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Cycle</Text>
              </View>
              <View style={styles.cardImageRow}>
                <Image source={cycleImage} style={styles.cardImage} resizeMode="contain" />
              </View>
              <View style={styles.cardBottomRow}>
                <Text style={styles.cycleText} numberOfLines={1}>No Flow</Text>
              </View>
            </View>
          </Card>

          {/* Workout Card */}
          <Card 
            style={{...styles.card, backgroundColor: '#FDF8F5'}}
            onPress={() => onNavigate('workout')}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Workout</Text>
              </View>
              <View style={styles.cardImageRow}>
                <Image source={workoutImage} style={styles.cardImage} resizeMode="contain" />
              </View>
              <View style={styles.cardBottomRow}>
                <View style={styles.cardValue}>
                <Text style={styles.valueNumber}>{workoutTime.hours}</Text>
                <Text style={[styles.valueUnit, { color: colors.workout }]}>hr</Text>
                <Text style={styles.valueNumber}>{workoutTime.minutes}</Text>
                <Text style={[styles.valueUnit, { color: colors.workout }]}>min</Text>
                </View>
              </View>
            </View>
          </Card>
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
  scrollContent: {
    paddingBottom: 120,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  cycleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  cycleRings: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 12,
    borderRadius: 999,
  },
  ringOuter: {
    width: 200,
    height: 200,
  },
  ringMiddle: {
    width: 160,
    height: 160,
  },
  ringInner: {
    width: 120,
    height: 120,
  },
  ringCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mood,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  card: {
    width: '48%',
    marginBottom: spacing.md,
    height: 188,
    paddingVertical: 0,
  },
  cardContent: {
    alignItems: 'stretch',
    flex: 1,
    height: 188,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardTitleRow: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardImageRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 136,
    height: 100,
  },
  cardBottomRow: {
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  valueNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  valueUnit: {
    fontSize: 13,
    color: colors.sleep,
    marginLeft: 2,
    marginRight: spacing.xs,
  },
  moodText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cycleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
