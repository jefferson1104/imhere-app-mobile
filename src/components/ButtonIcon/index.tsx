import { TouchableOpacityProps } from 'react-native';

import { Container } from './styles';

export type IButtonIconType = 'DEFAULT' | 'SECONDARY' | 'DANGER';

interface IButtonProps extends TouchableOpacityProps {
  type?: IButtonIconType;
  disabled?: boolean;
  icon: React.ReactNode | JSX.Element;
}

export function ButtonIcon({ icon, type = 'DEFAULT', disabled = false, ...rest }: IButtonProps) {
  // Renders
  return (
    <Container
      type={type}
      disabled={disabled}
      {...rest}
    >
      {icon}
    </Container>
  );
}
