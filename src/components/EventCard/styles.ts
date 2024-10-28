import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Content = styled.View`
  flex: 1;
  gap: 4px;
`;

export const EventName = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const EventDate = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
