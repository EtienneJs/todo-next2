import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";
import { Entry } from "../../interfaces";
import { DragEvent, FunctionComponent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";
import { dateFunctions } from "../../utils";
interface Props {
  entry: Entry;
}

export const EntriCard: FunctionComponent<Props> = ({ entry }) => {
  const router = useRouter();
  const { startDragging, endDragging } = useContext(UIContext);
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry._id);
    startDragging();
  };
  const onDragEnd = () => {
    endDragging();
  };
  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };
  // console.log(isDragging);
  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable={"true"}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", padding: 2 }}
        >
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
