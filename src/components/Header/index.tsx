import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import logoImg from '@assets/logo.png';

import { Container, BackButton, BackIcon } from "./styles";

interface IHeaderProps {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: IHeaderProps) {
  // Hooks
  const navigation = useNavigation();

  // Methods
  function handleGoBack() {
    navigation.goBack();
  };

  // Renders
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Image
        style={{ width: 200, height: 36 }}
        source={logoImg}
        contentFit='contain'
        transition={1000}
        alt="Im Here Logo"
      />
      {showBackButton && <View style={{ flex: 1 }} />}
    </Container>
  )
}
