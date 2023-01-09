import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { Layout } from "../../components/layouts";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { Entry, EntryStatus } from "../../interfaces";
import { useState, useMemo, FC, useContext } from "react";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const { _id, description, status: initialStatus } = entry;
  const [inputValue, setInputValue] = useState(description);
  const [status, setStatus] = useState<EntryStatus>(initialStatus);
  const [touch, setTouch] = useState(false);
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touch,
    [inputValue, touch]
  );
  const onTextFielChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onStatusChage = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus);
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };
  return (
    <Layout>
      <Grid container justifyContent={"center"} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada"
              subheader={`Creada: ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextFielChange}
                helperText={isNotValid && `ingrese un valor`}
                error={isNotValid}
                onBlur={() => setTouch(true)}
              />
              <FormControl>
                <FormLabel color="primary">Estado: {status}</FormLabel>
                <RadioGroup value={status} row onChange={onStatusChage}>
                  {validStatus.map((op) => (
                    <FormControlLabel
                      value={op}
                      control={<Radio />}
                      label={capitalize(op)}
                      key={op}
                    ></FormControlLabel>
                  ))}{" "}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                onClick={onSave}
                fullWidth
                variant="contained"
                startIcon={<SaveAltIcon />}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      entry,
    },
  };
};
export default EntryPage;
