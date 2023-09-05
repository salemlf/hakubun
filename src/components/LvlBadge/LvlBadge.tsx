import { IonBadge } from "@ionic/react";
import styled from "styled-components";

// TODO: just use normal container and not badge
const Badge = styled(IonBadge)`
  font-size: 1.75rem;
  margin-right: 0;
  color: white;
`;

type Props = {
  level: number | undefined;
};

function LvlBadge({ level }: Props) {
  return <Badge>{level}</Badge>;
}

export default LvlBadge;
