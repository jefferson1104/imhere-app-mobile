import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const DateButton = styled(TouchableOpacity)`
  ${({ theme }) => css`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    min-height: 56px;
    max-height: 56px;

    background-color: ${theme.COLORS.GRAY_600};

    border-radius: 6px;
    padding: 16px;
  `};
`;

export const DateButtonPlaceholder = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;


export const TextDateButton = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `};
`;
