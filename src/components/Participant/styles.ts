import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  gap: 16px;
  margin-bottom: 16px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 16px;
`;
