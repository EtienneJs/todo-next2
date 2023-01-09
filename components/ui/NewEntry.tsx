import { useState, ChangeEvent, useContext } from "react";
import { Button, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { EntriesContext } from "../../context/entries/EntriesContex";
import { UIContext } from "../../context/ui";

export const NewEntriy = () => {
  const { addNewEntry, entries } = useContext(EntriesContext);
  const { isAdding, setIsAdding } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touch, setTouch] = useState(false);

  const onTextFielChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onSave = async () => {
    if (inputValue.length === 0) return;
    await addNewEntry(inputValue);
    await setInputValue("");
    await setTouch(false);
    await setIsAdding(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Una nueva entrada"
            value={inputValue}
            helperText={inputValue.length <= 0 && touch && "Ingrese un valor"}
            error={inputValue.length <= 0 && touch}
            onChange={onTextFielChange}
            onBlur={() => setTouch(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={onSave}
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="text">
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          startIcon={<AddCircleIcon />}
          fullWidth
          variant="outlined"
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
