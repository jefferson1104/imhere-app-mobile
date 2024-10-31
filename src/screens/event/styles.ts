import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  flex: 1;
`;

export const EventInfo = styled.View`
  gap: 4px;
`;


export const EventTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const EventTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  max-width: 90%;
`;

export const EventDate = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const ParticipantsContainer = styled.View`
  flex: 1;
  margin-top: 16px;
`;

export const Form = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const EmptyList = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 128px;
`;

export const EmptyListDescription = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const Footer = styled.View`
  justify-content: flex-end;
`;
