import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { 
  HomeScreen, 
  DailyTipsScreen, 
  ProfileScreen,
  SleepDetailScreen,
  MoodDetailScreen,
  WorkoutDetailScreen,
  CycleDetailScreen 
} from './src/screens';
import { TabBar } from './src/components';
import { TabName } from './src/types';
import { colors } from './src/theme/colors';

// Luna App - Frontend Prototype
// TODO: Add authentication when backend is ready
// TODO: Replace mock data with API calls
// TODO: Add proper navigation library (React Navigation)

type DetailScreen = 'sleep' | 'mood' | 'workout' | 'cycle' | null;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [detailScreen, setDetailScreen] = useState<DetailScreen>(null);

  const handleNavigate = (screen: string) => {
    if (['sleep', 'mood', 'workout', 'cycle'].includes(screen)) {
      setDetailScreen(screen as DetailScreen);
    }
  };

  const handleCloseDetail = () => {
    setDetailScreen(null);
  };

  // Render detail screens as modals
  if (detailScreen === 'sleep') {
    return <SleepDetailScreen onClose={handleCloseDetail} />;
  }
  if (detailScreen === 'mood') {
    return <MoodDetailScreen onClose={handleCloseDetail} />;
  }
  if (detailScreen === 'workout') {
    return <WorkoutDetailScreen onClose={handleCloseDetail} />;
  }
  if (detailScreen === 'cycle') {
    return <CycleDetailScreen onClose={handleCloseDetail} />;
  }

  // Main tab-based navigation
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'tips':
        return <DailyTipsScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {renderScreen()}
      <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
