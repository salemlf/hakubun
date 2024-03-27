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

const AddButton = styled(Modal.Trigger)`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: var(--ion-color-secondary);
  border-radius: 16px;
  font-size: 0.9rem;
  color: white;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }

  ion-icon {
    margin-left: 5px;
    width: 1.25em;
    height: 1.25em;
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
            <AddButton aria-label="Add alternative meaning">
              Add <PlusSign>+</PlusSign>
            </AddButton>
            <Modal.Content
              title="Add Meaning"
              isOpen={isModalOpen}
              description="Add an alternative meaning, these will be accepted as correct answers!"
            >
              <MeaningForm onSubmit={handleSubmit}>
                <Fieldset>
                  <Label
                    labelfontSize="1rem"
                    isBold={true}
                    labelText="Meaning"
                    idOfControl="alt-user-meaning-input"
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
