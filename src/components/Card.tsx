import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../theme/colors';

interface CardProps {
  title?: string;
  backgroundColor?: string;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  title,
  backgroundColor = colors.cardBackground,
  onPress,
  children,
  style,
}) => {
  const cardStyle = [styles.card, { backgroundColor }, style];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style}>
        <View style={[styles.card, styles.fill, { backgroundColor }]}> 
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  fill: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
});
