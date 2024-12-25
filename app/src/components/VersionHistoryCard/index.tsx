import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

type VersionHistoryCardProps = {
  title: string;
  date: string;
  content: string;
};

/**
 * Card that displays an entry of the version history screen, with title, date, and body.
 * @param props component props
 *   @param props.title entry title
 *   @param props.date entry date
 *   @param props.content entry body text
 * @returns a card component
 */
const VersionHistoryCard = ({
  title,
  date,
  content,
}: VersionHistoryCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default VersionHistoryCard;
