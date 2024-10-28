import { useNavigation } from '@react-navigation/native';
import { CaretRight } from 'phosphor-react-native';

import theme from 'src/theme';

import { IEvent } from '@interfaces/event';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { formatDateToLongString } from "@utils/date";

import { EventStatus } from '@components/EventStatus';

import { Container, Content, EventName, EventDate } from "./styles";


export function EventCard({ id, name, date, status }: IEvent) {
  // Hooks
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // Methods
  const handleGoToEvent = (id: number) => {
    navigation.navigate('event', { eventId: id });
  };

  // Renders
  return (
    <Container onPress={() => handleGoToEvent(Number(id))}>
      <Content>
        <EventName>{name}</EventName>
        <EventDate>
          {formatDateToLongString(date)}
        </EventDate>
        <EventStatus status={status} />
      </Content>
      <CaretRight size={36} color={theme.COLORS.BLUE}/>
    </Container>
  );
}
