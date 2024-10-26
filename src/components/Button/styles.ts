import { ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { IButtonType } from '.';

export type ButtonProps = {
  type: IButtonType;
};

export const Container = styled(TouchableOpacity)<ButtonProps>`
  flex: 1;
  justify-content: center;
  align-items: center;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) => {
    if (type === 'DEFAULT') return theme.COLORS.BLUE;
    if (type === 'OUTLINE') return 'transparent';
    if (type === 'DANGER') return theme.COLORS.RED;
  }};

  border: ${({ theme, type }) => {
    if (type === 'DEFAULT') return 'none';
    if (type === 'OUTLINE') return theme.COLORS.BLUE;
    if (type === 'DANGER') return 'none';
  }};

  border-radius: 6px;
`;

export const Title = styled.Text<ButtonProps>`
  font-size: ${({ theme }) =>  theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) =>  theme.FONT_FAMILY.BOLD};

  color: ${({ theme, type }) => {
    if (type === 'DEFAULT') return theme.COLORS.WHITE;
    if (type === 'OUTLINE') return theme.COLORS.BLUE;
    if (type === 'DANGER') return theme.COLORS.WHITE;
  }};
`;

export const Loading = styled(ActivityIndicator).attrs<ButtonProps>(({ theme, type }) => ({
  size: 32,
  color: type === 'OUTLINE' ? theme.COLORS.BLUE : theme.COLORS.WHITE
}))``;
