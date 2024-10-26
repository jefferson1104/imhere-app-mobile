import styled from 'styled-components/native';

import { IEventStatus } from '@interfaces/event';

type EventStatusProps = {
  status: IEventStatus;
};

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Content = styled.View`
  gap: 5px;
`;

export const EventName = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const EventDate = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const EventStatus = styled.Text<EventStatusProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;

  color: ${({ theme, status }) => {
    if (status === 'OPEN') return theme.COLORS.BLUE_DARK;
    if (status === 'CLOSED') return theme.COLORS.RED_DARK;
  }};
`;
