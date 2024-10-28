import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { IEvent } from "@interfaces/event";

import { useEventsDatabase } from "@database/useEventsDatabase";

import { Header } from "@components/Header";
import { EventCard } from "@components/EventCard";
import { Loading } from "@components/Loading";

import { Container, Title } from "./styles";

export function EventList() {
  // Hooks
  const eventsDatabase = useEventsDatabase();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState<IEvent[]>([]);

  // Methods
  const listEvents = async () => {
    try {
      setIsLoading(true)
      const response = await eventsDatabase.listAll();
      setEventList(response as IEvent[]);
    } catch (error) {
      console.error('Error listing events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useFocusEffect(useCallback(() => {
    listEvents();
  }, []));

  // Renders
  return (
    <Container>
      <Header showBackButton />
      <Title>Event List</Title>

      {isLoading && (
        <Loading style={{ alignSelf: 'center', marginTop: 32 }} />
      )}

      {!isLoading && (
        <FlatList
          data={eventList}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 24, gap: 16 }}
          renderItem={({ item }) => (
            <EventCard
              id={item.id}
              name={item.name}
              date={item.date}
              status={item.status}
            />
          )}
        />
      )}
    </Container>
  );
}
