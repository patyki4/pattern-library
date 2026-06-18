import { Modal, Title, Text, Textarea, TextInput, Button, Group } from "@mantine/core";
import type { Pattern } from "../types/Pattern";
import { PatternEditView } from "./PatternEditView";

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
  sideBySide,
  setSideBySide,
}: PatternModalProps) {
    if (!pattern) {
        return null;
    }

return (
    <Modal
        opened={pattern !== null}
        onClose={onClose}
        size="90%"
        centered
    >
        {isEditing ? (
            <PatternEditView
                pattern={pattern}
                setPattern={setPattern}
                onSave={onSave}
                onCancel={() => {setPattern(null);
                    setIsEditing(false)}}
            />
        ) : (
            <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
                 <div
                    style={{
                        display:"flex",
                        flex: "1",
                        overflowY: "auto",
                        flexDirection: sideBySide ? "row" : "column",
                        overflow: "hidden",
                        height: "80vh",
                        //position: "relative",
                    }}
                >
                    <div>
                        {/* Thumbnail */}
                        {pattern.thumbnailUrl && (
                            <img
                            src={pattern.thumbnailUrl}
                            alt=""
                            style={{
                                float: "right",
                                width: sideBySide ? "300px" : "50%",
                                flexShrink: 0,
                                //maxHeight: "300px",
                                //objectFit: "contain",
                                borderRadius: "8px",
                                marginBottom: "1rem",
                                //position: "relative",
                                //top: 0,
                                //zIndex: 10
                            }}
                            />
                        )}
                            <Button
                                size="xs"
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    zIndex: 11
                                }}
                                onClick={() =>
                                    setSideBySide((prev) => !prev)
                                }
                                >
                                Layout
                            </Button>

                            {/* <Button
                                size="xs"
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 80,
                                    zIndex:11
                                }}
                                onClick={() => setPinThumbnail((prev) => !prev)}
                                >
                                {pinThumbnail ? "unpin" : "pin"}
                            </Button> */}
                        <Title order={2}>{pattern.title}</Title>
                        <Text style={{ whiteSpace: "pre-wrap" }}>
                            {pattern.content}
                        </Text>
                        
                    </div>
                </div>

                    {/* Footer */}
                    <Group justify="flex-end" style={{
                        borderTop: "1px solid #444",
                        paddingTop: "6px",
                        overflow:"clip"
                        }}>
                        <Button
                            onClick={onEdit}>
                            edit
                        </Button>
                    </Group>
            </div>)}
    </Modal>
)}
//         {pattern && !isEditing && (
//             <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
//                 <div
//                     style={{
//                         display:"flex",
//                         flex: "1",
//                         overflowY: "auto",
//                         flexDirection: sideBySide ? "row" : "column",
//                         overflow: "hidden",
//                         height: "80vh",
//                         //position: "relative",
//                     }}
//                 >
//                     <div>
//                         {/* Thumbnail */}
//                         {pattern.thumbnailUrl && (
//                             <img
//                             src={pattern.thumbnailUrl}
//                             alt=""
//                             style={{
//                                 float: "right",
//                                 width: sideBySide ? "300px" : "50%",
//                                 flexShrink: 0,
//                                 //maxHeight: "300px",
//                                 //objectFit: "contain",
//                                 borderRadius: "8px",
//                                 marginBottom: "1rem",
//                                 //position: "relative",
//                                 //top: 0,
//                                 //zIndex: 10
//                             }}
//                             />
//                         )}
//                             <Button
//                                 size="xs"
//                                 style={{
//                                     position: "absolute",
//                                     top: 8,
//                                     right: 8,
//                                     zIndex: 11
//                                 }}
//                                 onClick={() =>
//                                     setSideBySide((prev) => !prev)
//                                 }
//                                 >
//                                 Layout
//                             </Button>

//                             {/* <Button
//                                 size="xs"
//                                 style={{
//                                     position: "absolute",
//                                     top: 8,
//                                     right: 80,
//                                     zIndex:11
//                                 }}
//                                 onClick={() => setPinThumbnail((prev) => !prev)}
//                                 >
//                                 {pinThumbnail ? "unpin" : "pin"}
//                             </Button> */}
//                         <Title order={2}>{pattern.title}</Title>
//                         <Text style={{ whiteSpace: "pre-wrap" }}>
//                             {pattern.content}
//                         </Text>
                        
//                     </div>
//                 </div>

//                     {/* Footer */}
//                     <Group justify="flex-end" style={{
//                         borderTop: "1px solid #444",
//                         paddingTop: "6px",
//                         overflow:"clip"
//                         }}>
//                         <Button
//                             onClick={() => setIsEditing(true)}>
//                             edit
//                         </Button>
//                     </Group>
//             </div>
//         )}
//     </Modal>
//   );
// }




// {pattern && !isEditing && (
//             <div style={{ display: "flex", flexDirection: "column", height: "80vh", gap: 12 }}>
//                 <div
//                     style={{
//                         display:"flex",
//                         flex: "1",
//                         overflowY: "auto",
//                         flexDirection: sideBySide ? "row" : "column",
//                         overflow: "hidden",
//                         height: "80vh",
//                         //position: "relative",
//                     }}
//                 >
//                     <div>
//                         {/* Thumbnail */}
//                         {pattern.thumbnailUrl && (
//                             <img
//                             src={pattern.thumbnailUrl}
//                             alt=""
//                             style={{
//                                 float: "right",
//                                 width: sideBySide ? "300px" : "50%",
//                                 flexShrink: 0,
//                                 //maxHeight: "300px",
//                                 //objectFit: "contain",
//                                 borderRadius: "8px",
//                                 marginBottom: "1rem",
//                                 //position: "relative",
//                                 //top: 0,
//                                 //zIndex: 10
//                             }}
//                             />
//                         )}
//                             <Button
//                                 size="xs"
//                                 style={{
//                                     position: "absolute",
//                                     top: 8,
//                                     right: 8,
//                                     zIndex: 11
//                                 }}
//                                 onClick={() =>
//                                     setSideBySide((prev) => !prev)
//                                 }
//                                 >
//                                 Layout
//                             </Button>

//                             {/* <Button
//                                 size="xs"
//                                 style={{
//                                     position: "absolute",
//                                     top: 8,
//                                     right: 80,
//                                     zIndex:11
//                                 }}
//                                 onClick={() => setPinThumbnail((prev) => !prev)}
//                                 >
//                                 {pinThumbnail ? "unpin" : "pin"}
//                             </Button> */}
//                         <Title order={2}>{pattern.title}</Title>
//                         <Text style={{ whiteSpace: "pre-wrap" }}>
//                             {pattern.content}
//                         </Text>
                        
//                     </div>
//                 </div>

//                     {/* Footer */}
//                     <Group justify="flex-end" style={{
//                         borderTop: "1px solid #444",
//                         paddingTop: "6px",
//                         }}>
//                         <Button
//                             onClick={() => setIsEditing(true)}>
//                             edit
//                         </Button>
//                     </Group>
//             </div>
//         )}

            