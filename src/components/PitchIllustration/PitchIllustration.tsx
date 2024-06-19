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

type XCoords = {
  x1: number;
  x2: number;
};

type XCoordInfo = {
  coords: XCoords[];
  finalXStart: number;
  finalXEnd: number;
};

export type PitchForReading = {
  reading: string;
  pitch: PitchSection[];
};

type Props = {
  pitchForReading: PitchForReading;
  children?: React.ReactNode;
};

function PitchIllustration({ pitchForReading, children }: Props) {
  const [xCoordInfo, setXCoordInfo] = useState<XCoordInfo>();
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const addEndingNode =
    pitchForReading.pitch.length > 1 &&
    pitchForReading.pitch[pitchForReading.pitch.length - 1].part.length > 1;
  const nodeRadius = 5;
  const highY = 10;
  const lowY = 40;
  const height = 45;
  const strokeWidth = 2;

  const getTextWidthInPixels = (ref: HTMLSpanElement) =>
    ref.getBoundingClientRect().width;

  const createXCoords = (charWidths: number[]): XCoords[] => {
    const xCoords = charWidths.map((_width, idx) => {
      const accumulatorStart =
        pitchForReading.pitch[idx].part === ""
          ? 0 - nodeRadius * 0.5 - strokeWidth * 2
          : nodeRadius;

      const x1 =
        idx === 0
          ? nodeRadius + strokeWidth
          : pitchForReading.pitch.slice(0, idx).reduce((acc, _curr, i) => {
              return acc + charWidths[i];
            }, accumulatorStart);

      const x2 = pitchForReading.pitch
        .slice(0, idx + 1)
        .reduce((acc, curr, i) => {
          return acc + charWidths[i];
        }, accumulatorStart);

      return { x1, x2 };
    });
    return xCoords;
  };

  useEffect(() => {
    if (textRefs.current.length === pitchForReading.pitch.length) {
      const charWidths = textRefs.current.map((ref) =>
        ref ? getTextWidthInPixels(ref) : 0
      );

      const xCoordinates = createXCoords(charWidths);
      const finalXStart = pitchForReading.pitch
        .slice(0, pitchForReading.pitch.length - 1)
        .reduce((acc, curr, i) => {
          return acc + charWidths[i] + strokeWidth;
        }, nodeRadius);

      const finalXEnd =
        finalXStart +
        charWidths[charWidths.length - 1] -
        nodeRadius * (charWidths.length * 2) +
        nodeRadius +
        strokeWidth;

      setXCoordInfo({ coords: xCoordinates, finalXStart, finalXEnd });
    }
  }, [pitchForReading.pitch, pitchForReading.reading]);

  if (!xCoordInfo) {
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
  const { finalXStart, finalXEnd } = xCoordInfo;

  return (
    <IllustrationAndTxt>
      <svg
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-describedby="pitchDiagramTitle"
      >
        <title id="pitchDiagramTitle">
          pitch accent diagram for {pitchForReading.reading} vocab reading
        </title>
        {pitchForReading.pitch.map((pitchAccent, index) => {
          const { coords } = xCoordInfo;
          const { x1, x2 } = coords[index];

          const y = pitchAccent.high ? highY : lowY;

          return (
            <React.Fragment key={index}>
              {index < pitchForReading.pitch.length - 1 && (
                <line
                  x1={x1}
                  y1={y - strokeWidth}
                  x2={
                    pitchForReading.pitch[index + 1].part === ""
                      ? x2 - nodeRadius * 1.5 - strokeWidth * 2
                      : x2
                  }
                  y2={
                    pitchForReading.pitch[index + 1].high
                      ? highY - strokeWidth * 2
                      : lowY
                  }
                  {...(pitchForReading.pitch[index + 1].part === "" && {
                    strokeDasharray: "1,4",
                    strokeLinecap: "round",
                  })}
                  stroke="var(--text-color)"
                  strokeWidth={`${strokeWidth}`}
                />
              )}

              <circle
                cx={x1}
                cy={y - strokeWidth}
                r={nodeRadius}
                fill={
                  pitchAccent.high
                    ? "var(--ion-color-tertiary)"
                    : "var(--ion-color-primary)"
                }
                stroke="var(--text-color)"
                strokeWidth={`${strokeWidth}`}
                aria-describedby={`pitchNode${index}`}
              />
              <title id={`pitchNode${index}`}>
                {pitchAccent.high ? "High" : "Low"} pitch accent for{" "}
                {pitchAccent.part === ""
                  ? `end of ${pitchForReading.pitch[index - 1].part}`
                  : `${pitchAccent.part}`}{" "}
                part
              </title>
            </React.Fragment>
          );
        })}
        {addEndingNode && (
          <>
            <line
              x1={finalXStart + strokeWidth}
              y1={
                (pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY) - strokeWidth
              }
              x2={finalXEnd}
              y2={
                (pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY) - strokeWidth
              }
              stroke="var(--text-color)"
              strokeWidth={`${strokeWidth}`}
            />
            <circle
              cx={finalXEnd + nodeRadius}
              cy={
                (pitchForReading.pitch[pitchForReading.pitch.length - 1].high
                  ? highY
                  : lowY) - strokeWidth
              }
              r={nodeRadius}
              fill="none"
              stroke="var(--text-color)"
              strokeWidth={`${strokeWidth}`}
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
