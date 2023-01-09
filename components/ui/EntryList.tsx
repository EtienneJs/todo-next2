import { List, Paper } from "@mui/material";
import { DragEvent, useMemo } from "react";
import { EntriCard, ListDrop } from "./";
import { EntryStatus } from "../../interfaces/entry";
import { FunctionComponent, useContext } from "react";
import { EntriesContext } from "../../context/entries/EntriesContex";
import { UIContext } from "../../context/ui/UIContext";
import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}
export const EntryList: FunctionComponent<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );
  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;

    updateEntry(entry);
    endDragging();
  };
  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      // onDragEnter={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: 1,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntriCard key={entry._id} entry={entry} />
          ))}
        </List>
        {isDragging && (
          <>
            <ListDrop />
          </>
        )}
      </Paper>
    </div>
  );
};
