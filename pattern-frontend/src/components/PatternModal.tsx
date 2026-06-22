import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";
import { PatternEditView } from "./PatternEditView";
import { PatternDefaultView } from "./PatternDefaultView";

type PatternModalProps = {
  pattern: Pattern | null;
  isEditing: boolean;
  onEdit: () => void;

  setIsEditing: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setPattern: React.Dispatch<
    React.SetStateAction<Pattern | null>
  >;

  onSave: (pattern: Pattern) => void;

  opened: boolean;
  onClose: () => void;
  setDeleteTarget: (pattern: Pattern | null) => void;
  sideBySide: boolean;
  setSideBySide: React.Dispatch<
    React.SetStateAction<boolean>
  >;
//   pinThumbnail: boolean;
//   setPinThumbnail: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;
};

export function PatternModal({
  pattern,
  isEditing,
  setIsEditing,
  onEdit,
  setPattern,
  onSave,
  opened,
  onClose,
  setDeleteTarget,
  sideBySide,
  setSideBySide,
}: PatternModalProps) {
    if (!pattern) {
        return null;
    }

return (
    <Modal
        //title={pattern.title}
        opened={pattern !== null}
        onClose={onClose}
        withCloseButton={false}
        size="90%"
        centered
        styles={{
            content: {
                //overflow: "hidden",
                paddingBottom: 0,
            },
        }}
    >
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",  
                overflow: "hidden" 
            }}>
            <div
                style={{
                    flex: 1, 
                    overflowY: "auto", 
                    minHeight: 0, 
                }}
                >
                {isEditing ? (
                    <PatternEditView
                        pattern={pattern}
                        setPattern={setPattern}
                        onSave={onSave}
                        onCancel={() => {setPattern(null);
                            setIsEditing(false)}}
                        setDeleteTarget={setDeleteTarget}
                    />
                ) : (
                    <PatternDefaultView
                        pattern={pattern}
                        onEdit={onEdit}
                        onClose={onClose}
                    />)}
            </div>
        </div>
    </Modal>
)}

export default PatternModal;