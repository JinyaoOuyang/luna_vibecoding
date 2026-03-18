// Luna App Types
// TODO: These types will be used when connecting to backend API

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isPremium: boolean;
}

export interface SleepData {
  date: string;
  hours: number;
  minutes: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  level: number; // 0-100, where 100 is best
  note?: string;
}

export interface MoodData {
  date: string;
  entries: MoodEntry[];
  averageLevel: number;
}

export interface CycleData {
  currentDay: number;
  cycleLength: number;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  flowStatus: 'none' | 'light' | 'medium' | 'heavy';
  nextPeriodDate: string;
}

export interface WorkoutEntry {
  id: string;
  name: string;
  calories: number;
  duration?: number;
  distance?: number;
  unit?: 'km' | 'mi';
  icon: string;
}

export interface BodyScan {
  id: string;
  date: string;
  time: string;
  bodyFatPercentage: number;
}

export interface WorkoutData {
  date: string;
  caloriesBurned: number;
  calorieGoal: number;
  workouts: WorkoutEntry[];
  scans: BodyScan[];
}

export interface DailyTip {
  id: string;
  date: string;
  title: string;
  content: string;
  category: 'hygiene' | 'nutrition' | 'exercise' | 'mental' | 'cycle';
  imageUrl?: string;
  isSaved: boolean;
}

export interface WeekDay {
  date: number;
  dayName: string;
  isSelected: boolean;
  hasData: boolean;
}

export type TabName = 'home' | 'tips' | 'profile';
