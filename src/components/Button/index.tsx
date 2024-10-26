import { TouchableOpacityProps } from 'react-native';

import { Container, Loading, Title } from './styles';

export type IButtonType = 'DEFAULT' | 'OUTLINE' | 'DANGER';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  type?: IButtonType;
  isLoading?: boolean;
};

export function Button({ title, type = 'DEFAULT', isLoading = false, ...rest }: IButtonProps) {
  // Renders
  return (
    <Container
      type={type}
      {...rest}
    >
      {!isLoading && (
        <Title type={type}>
          {title}
        </Title>
      )}

      {isLoading && (
        <Loading type={type} />
      )}
    </Container>
  );
}
