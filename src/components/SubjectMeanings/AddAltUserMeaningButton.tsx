import { useEffect, useRef, useState } from "react";
import { IonSkeletonText } from "@ionic/react";
import { Subject } from "../../types/Subject";
import { displayToast } from "../Toast/Toast.service";
import { useStudyMaterialsBySubjID } from "../../hooks/study-materials/useStudyMaterialsBySubjID";
import { useStudyMaterialsChange } from "../../hooks/study-materials/useStudyMaterialsChange";
import Modal from "../Modal";
import Label from "../Label";
import Button from "../Button";
import styled from "styled-components";

const PlusSign = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  padding-left: 5px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  border: 2px solid black;
  font-size: 0.9rem;
  color: white;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
`;

const MeaningForm = styled.form``;

const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MeaningInput = styled.input`
  width: 100%;
  display: inline-flex;
  color: black;
  background-color: white;
  flex: 1;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
  border-radius: 12px;
  border: 1px solid black;
  font-size: 1.25rem;
`;

type Props = {
  subject: Subject;
};

function AddAltUserMeaningButton({ subject }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: studyMaterialLoading, data: studyMaterialData } =
    useStudyMaterialsBySubjID(subject.id);
  const { addUserAltSubjectMeaning } = useStudyMaterialsChange();

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const meaningInput = formData.get("user-meaning-input");
    const meaningInputStr = meaningInput ? meaningInput.toString() : "";

    if (meaningInputStr === "") {
      setIsModalOpen(false);
      displayToast({
        toastType: "warning",
        title: "No Meaning Entered",
        content: "Input was empty, no alternative meaning was added",
        timeout: 10000,
      });
    } else {
      setIsModalOpen(false);
      addUserAltSubjectMeaning(subject, studyMaterialData, meaningInputStr);
    }
  }

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
            <Modal.Trigger aria-label="Add alternative meaning" asChild>
              <AddButton className="base-button">
                Add <PlusSign>+</PlusSign>
              </AddButton>
            </Modal.Trigger>
            <Modal.Content
              modalID="add-alt-user-meaning-modal"
              title="Add Meaning"
              isOpen={isModalOpen}
              description="Add an alternative meaning, this will be accepted as a correct answer!"
              closeOnOutsidePress={false}
            >
              <MeaningForm onSubmit={handleSubmit}>
                <Fieldset>
                  <Label
                    labelText="Meaning"
                    idOfControl="alt-user-meaning-input"
                    hidden={true}
                  />
                  <MeaningInput
                    ref={inputRef}
                    id="alt-user-meaning-input"
                    type="text"
                    name="user-meaning-input"
                  />
                </Fieldset>
                <ButtonContainer>
                  <SubmitButton
                    className="base-button"
                    type="submit"
                    backgroundColor="var(--ion-color-tertiary)"
                    color="black"
                  >
                    Add
                  </SubmitButton>
                </ButtonContainer>
              </MeaningForm>
            </Modal.Content>
          </Modal>
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "20px" }}
        ></IonSkeletonText>
      )}
    </>
  );
}

export default AddAltUserMeaningButton;
