import { useCallback, useState } from "react";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import { IEvent } from "@interfaces/event";

import { useEventsDatabase } from "@database/useEventsDatabase";

import { AppRoutesParams } from "@routes/app.routes";

import { formatDateToLongString } from "@utils/date";

import { Header } from "@components/Header";
import { Loading } from "@components/Loading";

import { Container, EventTitle, EventDate, Content, Footer } from "./styles";
import { Button } from "@components/Button";
import { EventStatus } from "@components/EventStatus";

export function Event() {
  // Hooks
  const eventsDatabase = useEventsDatabase();
  const route = useRoute<RouteProp<AppRoutesParams, 'event'>>();

  // States
  const [event, setEvent] = useState<IEvent>();
  const [isLoading, setIsLoading] = useState(true);

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

  const updateEvent = async () => {
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

      {!isLoading && event && (
        <Content>
          <EventTitle numberOfLines={1}>{event.name}</EventTitle>
          <EventDate>{formatDateToLongString(event.date)}</EventDate>
          <EventStatus status={event.status} />
        </Content>
      )}

      <Footer>
        {event?.status === 'OPEN' ? (
          <Button
            title='Close this event'
            type='DANGER'
            onPress={updateEvent}
            activeOpacity={0.7}
          />
        ) : (
          <Button
            title='Open this event'
            type='DEFAULT'
            onPress={updateEvent}
            activeOpacity={0.7}
          />
        )}
      </Footer>
    </Container>
  );
}
