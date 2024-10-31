import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { ArrowsClockwise, PencilLine, UserPlus } from "phosphor-react-native";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import { IEvent } from "@interfaces/event";
import { IParticipant } from "@interfaces/participants";

import { useEventsDatabase } from "@database/useEventsDatabase";
import { useParticipantsDatabase } from "@database/useParticipantsDatabase";

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

import { Container, EventTitle, EventDate, Footer, ParticipantsContainer, Form, EmptyList, EmptyListDescription, EventInfo, Content, EventTitleContainer } from "./styles";

export function Event() {
  // Hooks
  const eventsDatabase = useEventsDatabase();
  const participantsDatabase = useParticipantsDatabase();
  const route = useRoute<RouteProp<AppRoutesParams, 'event'>>();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [participantName, setParticipantName] = useState('');
  const [event, setEvent] = useState<IEvent>();
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEventName, setNewEventName] = useState('');

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

  const getParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await participantsDatabase.listParticipants(eventId);
      setParticipants(response as IParticipant[]);
    } catch (error) {
      console.error('Error getting participants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
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
        console.error('Error updating event status:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateEventName = async () => {
    if (event) {
      try {
        setIsLoading(true);
        await eventsDatabase.updateById({
          id: event.id,
          name: newEventName,
          date: event.date,
          status: event.status,
        });
        setIsEditing(false);
        setNewEventName('');
        getEvent();
      } catch (error) {
        console.error('Error updating event name:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddParticipant = async () => {
    if (!participantName) {
      Alert.alert('Participant name empty!', 'Enter the name of the participant.');
      return;
    };

    if (participants.some(participant => participant.name === participantName)) {
      Alert.alert('Participant already registered!', 'There is already a participant with that name.');
      return;
    };

    try {
      setIsLoading(true);
      await participantsDatabase.createParticipant({
        name: participantName.trim(),
        eventId
      });
      getParticipants();
    } catch (error) {
      console.error('Error adding participant:', error);
    } finally {
      setIsLoading(false);
      setParticipantName('');
    }
  };

  const handleRemoveParticipant = async (selectedParticipant: IParticipant) => {
    const removeParticipant = async () => {
      try {
        setIsLoading(true);
        await participantsDatabase.deleteParticipant(selectedParticipant.id);
        getParticipants();
        Alert.alert(`The participant ${selectedParticipant.name} has been removed!`)
      } catch (error) {
        console.error('Error removing participant:', error);
      } finally {
        setIsLoading(false);
      }
    };

    Alert.alert('Remove participant!', `Would you like to remove ${selectedParticipant.name}?`, [
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

  useEffect(() => {
    if (eventId) {
      getParticipants();
    }
  }, [eventId]);

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
            <EventTitleContainer>
              {!isEditing && (
                <>
                  <EventTitle numberOfLines={1}>{event.name}</EventTitle>
                  <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <PencilLine color={theme.COLORS.WHITE} size={24} />
                  </TouchableOpacity>
                </>
              )}

              {isEditing && (
                <Form>
                  <Input
                    placeholder="Edit event name"
                    onChangeText={(text) => setNewEventName(text)}
                    value={newEventName}
                  />
                  <ButtonIcon
                    onPress={handleUpdateEventName}
                    icon={<ArrowsClockwise color={theme.COLORS.WHITE} size={32} />}
                  />
                </Form>
              )}
            </EventTitleContainer>





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
                onPress={handleAddParticipant}
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
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 148, overflow: 'hidden' }}
              renderItem={({ item }) => (
                <Participant
                  name={item.name}
                  onRemove={() => handleRemoveParticipant(item)}
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
            onPress={handleUpdateStatus}
            activeOpacity={0.7}
          />
        ) : (
          <Button
            title='Open this event'
            type='DEFAULT'
            onPress={handleUpdateStatus}
            activeOpacity={0.7}
          />
        )}
      </Footer>
    </Container>
  );
};
