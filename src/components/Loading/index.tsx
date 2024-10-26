import { ViewProps } from "react-native";
import { Container, LoadingIndicator } from "./styles";

interface ILoadingProps extends ViewProps {}

export function Loading({...rest}: ILoadingProps) {
  // Renders
  return (
    <Container {...rest}>
      <LoadingIndicator />
    </Container>
  );
}
