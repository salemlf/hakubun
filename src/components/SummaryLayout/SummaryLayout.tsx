import React from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
  FloatingButton,
  FloatingButtonContainer,
} from "../../styles/BaseStyledComponents";
import SvgIcon from "../SvgIcon";
import ColorHomeIcon from "../../images/home-color.svg?react";

const ButtonsContainer = styled(FloatingButtonContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const NavButton = styled(FloatingButton)`
  justify-content: center;
`;

const BtnTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

const Grid = styled(FullWidthGridDiv)`
  margin-top: 10px;
`;

interface SummaryLayoutProps {
  children: React.ReactNode;
  showButtons: boolean;
  onMorePress: () => void;
  moreButtonText: string;
  moreButtonIcon: React.ReactNode;
}

const SummaryLayout: React.FC<SummaryLayoutProps> = ({
  children,
  showButtons,
  onMorePress,
  moreButtonText,
  moreButtonIcon,
}) => {
  const navigate = useNavigate();

  return (
    <ContentWithTabBar>
      <Grid>{children}</Grid>
      <AnimatePresence>
        {showButtons && (
          <ButtonsContainer
            distancefrombottom="35px"
            transition={{ type: "spring", delay: 0.5, bounce: 0.25 }}
            initial={{ scale: 0, opacity: 0, x: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <NavButton
              backgroundColor="var(--ion-color-primary)"
              color="black"
              onPress={onMorePress}
            >
              <SvgIcon icon={moreButtonIcon} width="1.75em" height="1.75em" />
              <BtnTxt>{moreButtonText}</BtnTxt>
            </NavButton>
            <NavButton
              backgroundColor="var(--ion-color-tertiary)"
              color="black"
              onPress={() => navigate("/", { replace: true })}
            >
              <SvgIcon icon={<ColorHomeIcon />} width="1.5em" height="1.5em" />
              <BtnTxt>Home</BtnTxt>
            </NavButton>
          </ButtonsContainer>
        )}
      </AnimatePresence>
    </ContentWithTabBar>
  );
};

export default SummaryLayout;
