import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonTypeStyleProps } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  type?: ButtonTypeStyleProps;
  icon: React.ReactNode | JSX.Element;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: IButtonProps) {
  // Renders
  return (
    <Container
      type={type}
      {...rest}
    >
      {icon}
    </Container>
  );
}
