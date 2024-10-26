import { CaretRight } from 'phosphor-react-native';

import { IEvent } from '@interfaces/event';

import { formatDateToLongString } from "@utils/date";

import theme from 'src/theme';

import { Container, Content, EventName, EventDate, EventStatus } from "./styles";

export function EventCard({ id, name, date, status }: IEvent) {
  // Renders
  return (
    <Container onPress={() => console.log('EVENT ID', id)}>
      <Content>
        <EventName>{name}</EventName>
        <EventDate>
          {formatDateToLongString(date)}
        </EventDate>
        <EventStatus status={status}>{status}</EventStatus>
      </Content>
      <CaretRight size={36} color={theme.COLORS.BLUE}/>
    </Container>
  );
}
