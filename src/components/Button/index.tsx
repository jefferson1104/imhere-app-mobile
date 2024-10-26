import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

export type IButtonType = 'DEFAULT' | 'OUTLINE' | 'DANGER';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  type?: IButtonType;
}

export function Button({ title, type = 'DEFAULT', ...rest }: IButtonProps) {
  // Renders
  return (
    <Container
      type={type}
      {...rest}
    >
      <Title type={type}>
        {title}
      </Title>
    </Container>
  );
}
