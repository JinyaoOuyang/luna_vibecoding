// Mock Data for Luna App
// TODO: Replace with real API calls when backend is ready

import { User, SleepData, MoodData, CycleData, WorkoutData, DailyTip, WeekDay } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Kate',
  email: 'kate@luna.app',
  avatarUrl: undefined,
  isPremium: true,
};

export const mockSleepData: SleepData[] = [
  { date: '2024-03-18', hours: 7, minutes: 15, quality: 'good' },
  { date: '2024-03-19', hours: 6, minutes: 4, quality: 'fair' },
  { date: '2024-03-20', hours: 7, minutes: 59, quality: 'good' },
  { date: '2024-03-21', hours: 8, minutes: 12, quality: 'excellent' },
  { date: '2024-03-22', hours: 7, minutes: 45, quality: 'good' },
  { date: '2024-03-23', hours: 8, minutes: 30, quality: 'excellent' },
  { date: '2024-03-24', hours: 7, minutes: 20, quality: 'good' },
];

export const mockMoodData: MoodData = {
  date: '2024-03-20',
  entries: [
    { id: '1', timestamp: '2024-03-20T11:32:00', level: 75, note: 'Feeling good' },
    { id: '2', timestamp: '2024-03-20T09:59:00', level: 85, note: 'Great morning' },
    { id: '3', timestamp: '2024-03-20T14:15:00', level: 70, note: 'A bit tired' },
  ],
  averageLevel: 77,
};

export const mockCycleData: CycleData = {
  currentDay: 14,
  cycleLength: 28,
  phase: 'follicular',
  flowStatus: 'none',
  nextPeriodDate: '2024-04-03',
};

export const mockWorkoutData: WorkoutData = {
  date: '2024-03-20',
  caloriesBurned: 389,
  calorieGoal: 400,
  workouts: [
    { id: '1', name: 'Functional Strength Training', calories: 258, icon: '🏋️' },
    { id: '2', name: 'Indoor Walk', calories: 131, distance: 1.49, unit: 'km', icon: '🚶' },
  ],
  scans: [
    { id: '1', date: '2024-03-20', time: '10:32am', bodyFatPercentage: 26 },
    { id: '2', date: '2024-03-10', time: '9:32am', bodyFatPercentage: 28 },
  ],
};

export const mockDailyTips: DailyTip[] = [
  {
    id: '1',
    date: '2024-03-20',
    title: 'Wash with warm water and gentle fragrance-free soap',
    content: 'This keeps the vulva clean and reduces the risk of infection. Avoid douching, which can disrupt the natural vaginal balance.',
    category: 'hygiene',
    isSaved: false,
  },
  {
    id: '2',
    date: '2024-03-19',
    title: 'Stay hydrated during your cycle',
    content: 'Drinking plenty of water can help reduce bloating and cramps during menstruation. Aim for at least 8 glasses per day.',
    category: 'nutrition',
    isSaved: true,
  },
  {
    id: '3',
    date: '2024-03-18',
    title: 'Light exercise can help with cramps',
    content: 'Gentle yoga or walking can increase blood flow and release endorphins, which naturally reduce pain and improve mood.',
    category: 'exercise',
    isSaved: false,
  },
  {
    id: '4',
    date: '2024-03-17',
    title: 'Track your mood patterns',
    content: 'Understanding how your mood changes throughout your cycle can help you prepare and manage emotional fluctuations better.',
    category: 'mental',
    isSaved: false,
  },
  {
    id: '5',
    date: '2024-03-16',
    title: 'Iron-rich foods during menstruation',
    content: 'Eating iron-rich foods like spinach, red meat, and legumes can help replenish iron lost during your period.',
    category: 'nutrition',
    isSaved: true,
  },
  {
    id: '6',
    date: '2024-03-15',
    title: 'Get enough sleep',
    content: 'Quality sleep is essential for hormone regulation. Aim for 7-9 hours per night, especially during your luteal phase.',
    category: 'mental',
    isSaved: false,
  },
];

export const generateWeekDays = (selectedDate: number = 20): WeekDay[] => {
  return [
    { date: 15, dayName: 'Fri', isSelected: selectedDate === 15, hasData: true },
    { date: 16, dayName: 'Sat', isSelected: selectedDate === 16, hasData: true },
    { date: 17, dayName: 'Sun', isSelected: selectedDate === 17, hasData: true },
    { date: 18, dayName: 'Mon', isSelected: selectedDate === 18, hasData: true },
    { date: 19, dayName: 'Tue', isSelected: selectedDate === 19, hasData: true },
    { date: 20, dayName: 'Wed', isSelected: selectedDate === 20, hasData: true },
  ];
};

export const mockWeeklySleeepStats = {
  dailyAverage: { hours: 7, minutes: 28 },
  shortestSleep: { date: 'Mar 19, Tuesday', hours: 6, minutes: 4 },
  goalHours: 8,
  goalMinutes: 30,
};

export const profileMenuItems = [
  { id: '1', title: 'Health Details', icon: '❤️' },
  { id: '2', title: 'Change Goals', icon: '🎯' },
  { id: '3', title: 'Units of Measure', icon: '📏' },
];

export const profileSettingsItems = [
  { id: '4', title: 'Notifications', icon: '🔔' },
  { id: '5', title: 'Privacy', icon: '🔒' },
];
