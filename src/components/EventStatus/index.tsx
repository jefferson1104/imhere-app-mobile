import { IEventStatus } from "@interfaces/event";

import { Container, Status } from "./styles";

interface IEventStatusProps {
  status: IEventStatus;
}

export function EventStatus({ status }: IEventStatusProps) {
  // Renders
  return (
    <Container>
      Event status: <Status status={status}>{status}</Status>
    </Container>
  );
}
