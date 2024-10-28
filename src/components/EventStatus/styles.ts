import styled from 'styled-components/native';

import { IEventStatus } from '@interfaces/event';

type EventStatusProps = {
  status: IEventStatus;
};

export const Container = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const Status = styled.Text<EventStatusProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;

  color: ${({ theme, status }) => {
    if (status === 'OPEN') return theme.COLORS.BLUE_DARK;
    if (status === 'CLOSED') return theme.COLORS.RED_DARK;
  }};
`;
