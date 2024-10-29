import { Trash } from 'phosphor-react-native';

import { ButtonIcon } from '@components/ButtonIcon';

import theme from 'src/theme';

import { Container, Name } from './styles';

interface IParticipantProps {
  name: string;
  onRemove: () => void;
};

export function Participant({ name, onRemove }: IParticipantProps) {
  return (
    <Container>
      <Name>
        {name}
      </Name>
      <ButtonIcon
        onPress={onRemove}
        type='DANGER'
        icon={<Trash color={theme.COLORS.WHITE} size={32} />}
      />
    </Container>
  );
};
