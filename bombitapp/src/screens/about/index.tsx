import React from 'react';
import {ScrollView} from 'react-native';

import {VersionHistoryCard} from '../../components';
import {styles} from './styles';

/**
 * About Screen, that displays some version history notes.
 * @returns a screen component
 */
const AboutScreen = () => {
  const historyEntries = [
    {
      title: 'Versión 5.0.0',
      date: '4-6-2023',
      content: '- Reescritura de la app en TypeScript',
    },
    {
      title: 'Versión 4.0.0',
      date: '5-1-2023',
      content: '- Migración de la app a React Native',
    },
    {
      title: 'Versión 3.1',
      date: '10-2-2022',
      content:
        '- Corrección de error visual en los contadores de tiempo \n- Corrección de crash al fallar la conexión',
    },
    {
      title: 'Versión 3.0',
      date: '9-1-2022',
      content: '- Actualización de dependencias',
    },
    {
      title: 'Versión 2.0',
      date: '5-1-2021',
      content:
        '- Configuración de tiempo límite de funcionamiento \n- Reinicio después de un corte automático \n- Reseteo de memoria \n- Lectura de registros de arranque, estado de funcionamiento de la bomba y estado del automático',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {historyEntries.map(entry => {
        return (
          <VersionHistoryCard
            title={entry.title}
            date={entry.date}
            content={entry.content}
            key={entry.title}
          />
        );
      })}
    </ScrollView>
  );
};

export default AboutScreen;
