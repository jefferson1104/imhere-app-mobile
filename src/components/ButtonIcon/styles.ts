import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { IButtonIconType } from '.';

export type ButtonProps = {
  type: IButtonIconType;
};

export const Container = styled(TouchableOpacity)<ButtonProps>`
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;

  background-color: ${({ theme, type, disabled }) => type === 'DEFAULT' ? theme.COLORS.BLUE : theme.COLORS.RED};
  background-color: ${({ theme, type, disabled }) => {
    if (disabled) return theme.COLORS.GRAY_300;
    if (type === 'DEFAULT') return theme.COLORS.BLUE;
    if (type === 'SECONDARY') return theme.COLORS.GRAY_500;
    if (type === 'DANGER') return theme.COLORS.RED;
  }};

  border-radius: 6px;
`;
