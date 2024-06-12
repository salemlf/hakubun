export interface CustomSelectColor {
  selectioncolor: string;
}

export interface CustomBgColor {
  bgcolor: string;
}

export type TabContainerStyles = {
  bgcolor: string;
  $roundedcontainer: boolean;
};

export type BgColorSelectionAndHover = CustomSelectColor & CustomBgColor;

export type CustomFontSize = {
  tabfontsize: string;
};

export type TabStyledProps = BgColorSelectionAndHover & CustomFontSize;
