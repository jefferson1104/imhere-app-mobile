import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import backgroundImage from '@assets/background.png';

import { useEventsDatabase } from '@database/useEventsDatabase';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { DateTimePicker } from '@components/DateTimePicker';

import { Container, Content, Footer, Title } from './styles';

export function Home() {
  // Hooks
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const eventsDatabase = useEventsDatabase();

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Methods
  const handleGoRegisterParticipants = () => {
    navigation.navigate('registerParticipants', { eventName, eventDate });
  };

  const handleGoToEventList = () => {
    navigation.navigate('eventList');
  };

  const handleCreateEvent = async () => {
    if (!eventName) {
      Alert.alert('Event name is empty!', 'Please inform the event name.');
      return;
    };

    if (!eventDate) {
      Alert.alert('Event date is empty!', 'Please inform the event date.');
      return;
    };

    try {
      setIsLoading(true);
      const response  = await eventsDatabase.create({ name: eventName.trim(), date: eventDate });
      Alert.alert('Event created!', `Event ${eventName} created with id ${response.insertedRowId}!` , [
        {
          text: 'Go to register participants',
          onPress: handleGoRegisterParticipants
        },
        {
          text: 'Go to events list',
          onPress: handleGoToEventList
        }
      ]);
    } catch (error) {
      Alert.alert('Error creating event!', 'An error occurred while creating the event. Please try again.');
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    setEventName('');
    setEventDate('');
  }, [])

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
          disabled={isLoading}
          isLoading={isLoading}
          onPress={handleCreateEvent}
        />
      </Content>

      <Footer>
        <Button
          title='Go to events list'
          type='OUTLINE'
          onPress={handleGoToEventList}
          activeOpacity={0.7}
        />
      </Footer>
    </Container>
  );
}
