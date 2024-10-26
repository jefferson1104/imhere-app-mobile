import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

export type ButtonProps = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<ButtonProps>`
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;

  background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.BLUE : theme.COLORS.RED};

  border-radius: 6px;
`;
