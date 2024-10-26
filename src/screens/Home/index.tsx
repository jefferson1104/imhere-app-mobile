import { useState } from 'react';
import { Alert } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import backgroundImage from '@assets/background.png';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { DateTimePicker } from '@components/DateTimePicker';

import { Container, Content, Footer, Title } from './styles';

export function Home() {
  // Hooks
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // States
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Methods
  const handleGoRegisterParticipants = () => {
    if (!eventName) {
      Alert.alert('Event name is empty!', 'Please inform the event name.');
      return;
    }

    if (!eventDate) {
      Alert.alert('Event date is empty!', 'Please inform the event date.');
      return;
    }

    navigation.navigate('registerParticipants', { eventName, eventDate });
  };

  // Renders
  return (
    <Container>
      <Image
        source={backgroundImage}
        contentFit='cover'
        style={{
          flex: 1,
          position: 'absolute',
          width: 480,
          height: 1000,
        }}
      />

      <Header />

      <Content>
        <Title>
          Create a new event
        </Title>
        <Input
          placeholder="Event name"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
        />
        <DateTimePicker
          onChange={(date) => setEventDate(date.toISOString())}
          currentDate={eventDate ? new Date(eventDate) : undefined}
        />
        <Button
          title='Create event'
          onPress={handleGoRegisterParticipants}
        />
      </Content>

      <Footer>
        <Button
          title='Check your events'
          type='OUTLINE'
          activeOpacity={0.7}
        />
      </Footer>
    </Container>
  );
}
