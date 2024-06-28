import {
  act,
  createQueryWrapper,
  createTestRouter,
  renderHook,
  screen,
  TestRoute,
  waitFor,
} from "../../testing/test-utils";
import { mockStudyMaterialsBySubjIDsResponse } from "../../testing/mocks/api-responses/study-materials-responses";
import { generateSubject } from "../../testing/mocks/data-generators/subjectGenerator";
import { generateStudyMaterialCollectionFromSubjs } from "../../testing/mocks/data-generators/collectionGenerator";
import { createCorrespondingSubject } from "../../testing/mocks/data-generators/assignmentGenerator";
import { useStudyMaterialsBySubjID } from "../../hooks/study-materials/useStudyMaterialsBySubjID";
import { Subject } from "../../types/Subject";
import UserNote, { Props } from "./UserNote";

const mockKanjiLvl1Subj = generateSubject({ subjType: "kanji", level: 1 });

const mockStudyMaterialResponse = (
  subject: Subject,
  hasMeaningNote: boolean,
  hasReadingNote: boolean
) => {
  const correspondingSubj = createCorrespondingSubject(
    subject.id,
    subject.object
  );
  const mockStudyMaterialCollection = generateStudyMaterialCollectionFromSubjs({
    correspondingSubjects: [correspondingSubj],
    hasMeaningNote,
    hasReadingNote,
  });

  mockStudyMaterialsBySubjIDsResponse(
    [subject.id],
    mockStudyMaterialCollection
  );
};

test("UserNote renders", async () => {
  const { baseElement } = await renderComponent({
    subject: mockKanjiLvl1Subj,
    noteType: "meaning",
  });
  expect(baseElement).toBeDefined();
});

test("Add meaning note modal appears on add click", async () => {
  mockStudyMaterialResponse(mockKanjiLvl1Subj, false, false);
  const { user } = await renderComponent({
    subject: mockKanjiLvl1Subj,
    noteType: "meaning",
  });

  const { result } = renderHook(
    () => useStudyMaterialsBySubjID(mockKanjiLvl1Subj.id),
    {
      wrapper: createQueryWrapper(),
    }
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    await screen.findByRole("button", {
      name: /add meaning note/i,
    })
  );

  const addNoteModal = await screen.findByRole("dialog", {
    name: /meaning note/i,
  });
  expect(addNoteModal).toBeInTheDocument();
});

test("Add reading note modal appears on add click", async () => {
  mockStudyMaterialResponse(mockKanjiLvl1Subj, false, false);
  const { user } = await renderComponent({
    subject: mockKanjiLvl1Subj,
    noteType: "reading",
  });

  const { result } = renderHook(
    () => useStudyMaterialsBySubjID(mockKanjiLvl1Subj.id),
    {
      wrapper: createQueryWrapper(),
    }
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    await screen.findByRole("button", {
      name: /add reading note/i,
    })
  );

  const addNoteModal = await screen.findByRole("dialog", {
    name: /reading note/i,
  });
  expect(addNoteModal).toBeInTheDocument();
});

test("Edit note modal appears on edit click", async () => {
  mockStudyMaterialResponse(mockKanjiLvl1Subj, true, true);
  const { user } = await renderComponent({
    subject: mockKanjiLvl1Subj,
    noteType: "meaning",
  });

  const { result } = renderHook(
    () => useStudyMaterialsBySubjID(mockKanjiLvl1Subj.id),
    {
      wrapper: createQueryWrapper(),
    }
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  await user.click(
    await screen.findByRole("button", {
      name: /edit meaning note/i,
    })
  );

  const editNoteModal = await screen.findByRole("dialog", {
    name: /meaning note/i,
  });
  expect(editNoteModal).toBeInTheDocument();
});

test("Delete note modal appears on edit click", async () => {
  const mockRadicalLvl1Subj = generateSubject({
    subjType: "radical",
    level: 1,
  });
  mockStudyMaterialResponse(mockRadicalLvl1Subj, true, false);
  const { user } = await renderComponent({
    subject: mockRadicalLvl1Subj,
    noteType: "meaning",
    isRadical: true,
  });

  const { result } = renderHook(
    () => useStudyMaterialsBySubjID(mockRadicalLvl1Subj.id),
    {
      wrapper: createQueryWrapper(),
    }
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  console.log("🚀 ~ test ~ result.current.data:", result.current.data);

  await user.click(
    await screen.findByRole("button", {
      name: /delete note/i,
    })
  );

  const deleteNoteModal = await screen.findByRole("alertdialog", {
    name: /delete note/i,
  });

  expect(deleteNoteModal).toBeInTheDocument();
});

const renderComponent = async ({ ...props }: Props) => {
  const userNotePath = "/subjects/$subjId";
  const routesToRender: TestRoute[] = [
    {
      component: () => <UserNote {...props} />,
      path: userNotePath,
    },
  ];

  return await act(async () => {
    return createTestRouter({
      routes: routesToRender,
      initialEntry: userNotePath,
    });
  });
};
