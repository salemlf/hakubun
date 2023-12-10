import { generateSubjAssignmentPairArray } from "../testing/mocks/data-generators/subjAssignmentPairGenerator";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import { generateQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import {
  CorrespondingSubject,
  createCorrespondingSubject,
} from "../testing/mocks/data-generators/assignmentGenerator";
import { generateStudyMaterialArrFromSubjs } from "../testing/mocks/data-generators/studyMaterialGenerator";

// TODO: change so can specify if vocab, kana vocab, or both
// type CreateGeneralVocabQueueItemsParams = {
//   vocabTypes: "vocabulary" | "kana_vocabulary" | "both";
// }

const createGeneralVocabQueueItems = (): AssignmentQueueItem[] => {
  const mockVocabAssignmentSubjPairs = generateSubjAssignmentPairArray({
    subjTypes: "vocabulary",
    numPairs: 2,
    level: 1,
  });
  const mockKanaVocabAssignmentSubjPairs = generateSubjAssignmentPairArray({
    subjTypes: "kana_vocabulary",
    numPairs: 2,
    level: 1,
  });

  const generalVocabAssignments = [
    ...mockVocabAssignmentSubjPairs.assignments,
    ...mockKanaVocabAssignmentSubjPairs.assignments,
  ];
  const generalVocabSubjs = [
    ...mockVocabAssignmentSubjPairs.subjects,
    ...mockKanaVocabAssignmentSubjPairs.subjects,
  ];

  const correspondingSubjInfo: CorrespondingSubject[] = generalVocabSubjs.map(
    (subj) => createCorrespondingSubject(subj.id, subj.object)
  );
  const studyMaterials = generateStudyMaterialArrFromSubjs({
    correspondingSubjects: correspondingSubjInfo,
  });

  return generateQueueItems({
    assignments: generalVocabAssignments,
    subjects: generalVocabSubjs,
    studyMaterials,
    queueProgressState: "not_started",
    backToBackChoice: "disabled",
  });
};

// TODO: update to test getReadingAudio instead
// describe("getAudiosForReading", () => {
//   test("Uses non-ogg files so compatible w Safari/iOS", () => {
//     const jaChars = fakerJA.word.words({ count: { min: 1, max: 8 } });
//     const mockReadings = generateSubjReadings();
//     const readingsForMockAudio = getReadingsForMockAudio(
//       "vocabulary",
//       jaChars,
//       mockReadings
//     );
//     const mockPronunciationAudioItems = generatePronunciationAudios(
//       readingsForMockAudio,
//       true
//     );

//     const mockUserAnswer = faker.helpers.arrayElement(
//       mockPronunciationAudioItems
//     ).metadata.pronunciation;

//     const mockItemForVoice = faker.helpers.arrayElement(
//       mockPronunciationAudioItems
//     );

//     const mockVoice = generateVoiceFromAudioMetadata(mockItemForVoice.metadata);

//     const audioItems = getAudiosForReading(
//       mockPronunciationAudioItems,
//       mockUserAnswer,
//       mockVoice
//     );

//     const noOggAudioItems = audioItems.every(
//       (audioItem) => audioItem.content_type !== "audio/ogg"
//     );

//     expect(noOggAudioItems).toBe(true);
//   });
// });

// describe("getReadingAudioFiles", () => {
//   test("Returns audio files with pronunciation and primary reading info", () => {
//     const queueItems = createGeneralVocabQueueItems();
//     queueItems.map((queueItem: AssignmentQueueItem) => {
//       const audioFiles = getReadingAudioFiles(queueItem, true);
//       // *testing
//       console.log(
//         "🚀 ~ file: AudioService.test.ts:100 ~ queueItems.map ~ audioFiles:",
//         audioFiles
//       );
//       // *testing
//       // expect(audioFiles.length).toBeGreaterThan(0);
//       // audioFiles.map((audioFile) => {
//       //   expect(audioFile.pronunciation).toBeDefined();
//       //   expect(audioFile.primaryReading).toBeDefined();
//       // });
//     });
//   });
// });
