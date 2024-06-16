import React, { useEffect, useRef, useState } from "react";
import { PitchSection } from "../../types/Jotoba";
import styled from "styled-components";
import { ReadingTxt } from "../../styles/SubjectDetailsStyled";

const IllustrationAndTxt = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReadingTxtAndChildren = styled.div`
  display: flex;
  align-items: center;
`;

export type PitchForReading = {
  reading: string;
  pitch: PitchSection[];
};

type Props = {
  pitchForReading: PitchForReading;
  children?: React.ReactNode;
};

function PitchIllustration({ pitchForReading, children }: Props) {
  const [charWidths, setCharWidths] = useState<number[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const addEndingNode =
    pitchForReading.pitch.length > 1 &&
    pitchForReading.pitch[pitchForReading.pitch.length - 1].part.length > 1;

  const getTextWidthInPixels = (ref: HTMLSpanElement) =>
    ref.getBoundingClientRect().width;

  useEffect(() => {
    if (textRefs.current.length === pitchForReading.pitch.length) {
      const widths = textRefs.current.map((ref) =>
        ref ? getTextWidthInPixels(ref) : 0
      );
      setCharWidths(widths);
    }
  }, [pitchForReading.pitch, pitchForReading.reading]);

  const svgNamespace = "http://www.w3.org/2000/svg";
  const nodeRadius = 5;
  const highY = 10;
  const lowY = 40;
  const height = 45;
  const strokeWidth = 2;

  const finalXStart = pitchForReading.pitch
    .slice(0, pitchForReading.pitch.length - 1)
    .reduce((acc, curr, i) => {
      return acc + charWidths[i];
    }, nodeRadius);

  const finalXEnd =
    finalXStart +
    charWidths[charWidths.length - 1] -
    nodeRadius * (charWidths.length * 2);

  // TODO: display loading skeleton instead, will not display pitch illustration if no pitch info
  if (charWidths.length === 0) {
    return (
      <ReadingTxt>
        {pitchForReading.pitch.map((note, index) => {
          return (
            <span key={index} ref={(el) => (textRefs.current[index] = el)}>
              {note.part}
            </span>
          );
        })}
      </ReadingTxt>
    );
  }

  return (
    <IllustrationAndTxt>
      <svg
        width="100%"
        height={height}
        xmlns={svgNamespace}
        role="img"
        aria-describedby="pitchDiagramTitle"
      >
        <title id="pitchDiagramTitle">
          pitch accent diagram for {pitchForReading.reading} vocab reading
        </title>
        {pitchForReading.pitch.map((pitchAccent, index) => {
          const x =
            index === 0
              ? nodeRadius
              : pitchForReading.pitch.slice(0, index).reduce((acc, curr, i) => {
                  return acc + charWidths[i];
                }, nodeRadius);
          const y = pitchAccent.high ? highY : lowY;
          const nextX = pitchForReading.pitch
            .slice(0, index + 1)
            .reduce((acc, curr, i) => {
              return acc + charWidths[i];
            }, nodeRadius);

          return (
            <React.Fragment key={index}>
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill="var(--text-color)"
                // TODO: change to fill={pitchAccent.high ? "var(--ion-color-tertiary)" : "var(--ion-color-primary)"}
                // TODO: add stroke="var(--text-color)" and strokeWidth="2"
                aria-describedby={`pitchNode${index}`}
              />
              <title id={`pitchNode${index}`}>
                {pitchAccent.high ? "High" : "Low"} pitch accent for{" "}
                {pitchAccent.part} part
              </title>
              {index < pitchForReading.pitch.length - 1 && (
                <line
                  x1={x}
                  y1={y}
                  x2={nextX}
                  y2={pitchForReading.pitch[index + 1].high ? highY : lowY}
                  stroke="var(--text-color)"
                  strokeWidth={`${strokeWidth}`}
                />
              )}
            </React.Fragment>
          );
        })}
        {addEndingNode && (
          <>
            <line
              x1={finalXStart}
              y1={
                pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY
              }
              x2={finalXEnd + nodeRadius - 2}
              y2={
                pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY
              }
              stroke="var(--text-color)"
              strokeWidth={`${strokeWidth}`}
            />
            <circle
              cx={finalXEnd + nodeRadius * 2 - 2}
              cy={
                pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY
              }
              r={nodeRadius}
              fill="none"
              stroke="var(--text-color)"
            />
          </>
        )}
      </svg>
      <ReadingTxtAndChildren>
        <ReadingTxt>
          {pitchForReading.pitch.map((pitchAccent, index) => {
            return (
              <span key={index} ref={(el) => (textRefs.current[index] = el)}>
                {pitchAccent.part}
              </span>
            );
          })}
        </ReadingTxt>
        {children}
      </ReadingTxtAndChildren>
    </IllustrationAndTxt>
  );
}

export default PitchIllustration;
