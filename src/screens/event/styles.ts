import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Content = styled.View`
  flex: 1;
  gap: 4px;
`;

export const EventTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const EventDate = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 32px;
`;
