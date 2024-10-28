import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { IEvent } from "@interfaces/event";

import { useEventsDatabase } from "@database/useEventsDatabase";

import { Header } from "@components/Header";
import { EventCard } from "@components/EventCard";
import { Loading } from "@components/Loading";

import { Container, FilterButton, Filters, FilterText, Title } from "./styles";

export function EventList() {
  // Hooks
  const eventsDatabase = useEventsDatabase();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState<IEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // Constants
  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
  ];

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

  const listEventsByStatus = async (status: string) => {
    try {
      setIsLoading(true)
      const response = await eventsDatabase.listByStatus(status);
      setEventList(response as IEvent[]);
    } catch (error) {
      console.error('Error listing events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useFocusEffect(useCallback(() => {
    if (selectedFilter === 'ALL') {
      listEvents();
    }

    if (selectedFilter !== 'ALL') {
      listEventsByStatus(selectedFilter);
    }
  }, [selectedFilter]));

  // Renders
  return (
    <Container>
      <Header showBackButton />
      <Title>Event List</Title>

      <Filters>
        {filters.map(filter => (
          <FilterButton
            key={filter.value}
            onPress={() => setSelectedFilter(filter.value)}
            isSelected={selectedFilter === filter.value}
          >
            <FilterText>
              {filter.label}
            </FilterText>
          </FilterButton>
        ))}
      </Filters>

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
