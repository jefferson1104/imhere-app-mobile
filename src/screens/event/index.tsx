import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { UserPlus } from "phosphor-react-native";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import { IEvent } from "@interfaces/event";

import { useEventsDatabase } from "@database/useEventsDatabase";

import { AppRoutesParams } from "@routes/app.routes";

import { formatDateToLongString } from "@utils/date";

import theme from "src/theme";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { EventStatus } from "@components/EventStatus";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Loading } from "@components/Loading";
import { Participant } from "@components/Participant";

import { Container, EventTitle, EventDate, Footer, ParticipantsContainer, Form, EmptyList, EmptyListDescription, EventInfo, Content } from "./styles";

export function Event() {
  // Hooks
  const eventsDatabase = useEventsDatabase();
  const route = useRoute<RouteProp<AppRoutesParams, 'event'>>();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [participantName, setParticipantName] = useState('');
  const [event, setEvent] = useState<IEvent>();
  const [participants, setParticipants] = useState<string[]>([]);

  // Constants
  const eventId = route.params.eventId;

  // Methods
  const getEvent = async () => {
    try {
      setIsLoading(true);
      const response = await eventsDatabase.listById(eventId);
      setEvent(response[0] as IEvent);
    } catch (error) {
      console.error('Error getting event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEvent = async () => {
    if (event) {
      try {
        setIsLoading(true);
        await eventsDatabase.updateById({
          id: event.id,
          name: event.name,
          date: event.date,
          status: event.status === 'OPEN' ? 'CLOSED' : 'OPEN',
        });
        getEvent();
      } catch (error) {
        console.error('Error updating event:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleParticipantAdd = () => {
    if (!participantName) {
      Alert.alert('Participant name empty!', 'Enter the name of the participant.');
      return;
    }

    if (participants.includes(participantName)) {
      Alert.alert('Participant already registered!', 'There is already a participant with that name.');
      return;
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  };

  const handleParticipantRemove = (name: string) => {
    const removeParticipant = () => {
      const newParticipants = participants.filter(participant => participant !== name);
      setParticipants(newParticipants);
      Alert.alert(`The participant ${name} has been removed!`)
    };

    Alert.alert('Remove participant!', `Would you like to remove ${name}?`, [
      {
        text: 'yes',
        onPress: () => removeParticipant()
      },
      {
        text: 'No',
        style: 'cancel'
      }
    ]);
  };

  // Effects
  useFocusEffect(useCallback(() => {
    getEvent();
  }, []));

  // Renders
  return (
    <Container>
      <Header showBackButton />
      {isLoading && (
        <Loading style={{ alignSelf: 'center', marginTop: 32 }} />
      )}
      <Content>
        {!isLoading && event && (
          <EventInfo>
            <EventTitle numberOfLines={1}>{event.name}</EventTitle>
            <EventDate>{formatDateToLongString(event.date)}</EventDate>
            <EventStatus status={event.status} />
          </EventInfo>
        )}
        {event && (
          <ParticipantsContainer>
            <Form>
              <Input
                placeholder="Add guest"
                onChangeText={(text) => setParticipantName(text)}
                value={participantName}
              />
              <ButtonIcon
                disabled={event.status === 'CLOSED' ? true : false}
                onPress={handleParticipantAdd}
                icon={<UserPlus color={theme.COLORS.WHITE} size={32} />}
              />
            </Form>
            {participants.length > 0 && (
              <EventTitle style={{ marginBottom: 16, marginTop: 16 }}>
                Guest List
              </EventTitle>
            )}
            <FlatList
              data={participants}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 148, overflow: 'hidden' }}
              renderItem={({ item }) => (
                <Participant
                  name={item}
                  onRemove={() => handleParticipantRemove(item)}
                />
              )}
              ListEmptyComponent={() => (
                <EmptyList>
                  <EmptyListDescription>
                    No guests registered. Add guests to your guest list.
                  </EmptyListDescription>
                </EmptyList>
              )}
            />
          </ParticipantsContainer>
        )}
      </Content>
      <Footer>
        {event?.status === 'OPEN' ? (
          <Button
            title='Close this event'
            type='DANGER'
            onPress={handleUpdateEvent}
            activeOpacity={0.7}
          />
        ) : (
          <Button
            title='Open this event'
            type='DEFAULT'
            onPress={handleUpdateEvent}
            activeOpacity={0.7}
          />
        )}
      </Footer>
    </Container>
  );
};
