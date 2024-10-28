import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

interface FilterButtonProps {
  isSelected: boolean;
}

export const Filters = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;

export const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;

  border-radius: 6px;
  border-width: 1px;

  border-color: ${({ theme, isSelected }) => {
    if (isSelected) return theme.COLORS.BLUE_DARK;
    if (!isSelected) return theme.COLORS.GRAY_600;
  }};

  background-color: ${({ theme, isSelected }) => {
    if (isSelected) return theme.COLORS.BLUE_DARK;
    if (!isSelected) return theme.COLORS.GRAY_600;
  }};
`;

export const FilterText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
