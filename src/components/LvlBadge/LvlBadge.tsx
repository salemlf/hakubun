import styled from "styled-components";

type BadgeSizeStyles = {
  containersize: string;
  fontsize: string;
};

const badgeSizeInfo: { [index: string]: BadgeSizeStyles } = {
  sm: {
    containersize: "2.5rem",
    fontsize: "1.5rem",
  },
  md: {
    containersize: "3rem",
    fontsize: "2rem",
  },
};

type BadgeSize = "sm" | "md";

export const getBadgeSize = (size: BadgeSize) => {
  return badgeSizeInfo[size as keyof object];
};

type BadgeContainerProps = {
  containersize: string;
};

const Badge = styled.div<BadgeContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  font-size: 1.75rem;
  margin-right: 0;
  color: white;
  width: ${({ containersize }) => containersize};
  height: ${({ containersize }) => containersize};
  line-height: 1.3;
  border-radius: 12px;
`;

type BadgeTxtProps = {
  txtsize: string;
};

const BadgeText = styled.p<BadgeTxtProps>`
  margin: 0;
  padding: 0;
  font-size: ${({ txtsize }) => txtsize};
`;

type Props = {
  level: number | undefined;
  size?: BadgeSize;
};

function LvlBadge({ level, size = "md" }: Props) {
  let sizeInfo = getBadgeSize(size);

  return (
    <Badge containersize={sizeInfo.containersize}>
      <BadgeText txtsize={sizeInfo.fontsize}>{level ?? "?"}</BadgeText>
    </Badge>
  );
}

export default LvlBadge;
