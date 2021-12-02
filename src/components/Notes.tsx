/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { batchEncounter } from "../redux/actions/encounter";
import { getNotes } from "../redux/actions/notes";
import { openMessage } from "../redux/actions/message";
import { getAuth } from "../utils/helpers";
import {
  CardActions,
  CardMedia,
  CardContent,
  Card,
  Typography,
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import DemoImage from "../assets/images/prescription-bottle.jpg";
import jwt_decode from "jwt-decode";

export default function Notes() {
  const dispatch: any = useDispatch();
  const auth: any = getAuth();
  const decodedEncounter: any = jwt_decode(auth.encounterID);
  const decodedUser: any = jwt_decode(auth.userToken);
  const [pending, setPending] = React.useState<boolean>(true);

  const storeBatchEncounter = useSelector(
    (state: RootState) => state.encounter.batch
  );
  const { data: batchData, loading: batchLoading }: any = storeBatchEncounter;

  const storeGetNotes = useSelector((state: RootState) => state.notes);
  const { data: notesData, loading: notesLoading }: any = storeGetNotes;

  const callApiBatchEncounter = async () => {
    try {
      await dispatch(
        batchEncounter({
          ids: [
            {
              ID: decodedEncounter.id,
              Kind: decodedEncounter.kind,
            },
          ],
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  const callApiGetNotes = async () => {
    try {
      await dispatch(getNotes(decodedUser.usr));
    } catch (error) {
      console.log(error);
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  React.useEffect(() => {
    if (pending) {
      const interval = setInterval(() => {
        callApiBatchEncounter();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pending]);

  React.useEffect(() => {
    if (
      Object.keys(batchData.items).length > 0 &&
      batchData.items[0].status !== ""
    ) {
      setPending(false);
      callApiGetNotes();
    }
  }, [batchData]);

  console.log(notesData);

  return (
    <div>
      <Box mt={10} sx={{ width: "100%", mx: "auto" }}>
        <Typography variant="h6" gutterBottom component="div" mb={5}>
          Order #12355
        </Typography>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={DemoImage}
            alt="Live from space album cover"
          />
          {!pending && Object.keys(notesData.items).length > 0 ? (
            <React.Fragment>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {notesData.items[0].description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notesData.items[0].content !== null
                    ? notesData.items[0].content
                    : `Lizards are a widespread group of squamate reptiles, with over
                    6,000 species, ranging across all continents except Antarctica`}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex" }}>
                <PictureAsPdfIcon
                  sx={{
                    color: "#48275a",
                    fontSize: "40px",
                  }}
                />
                <IconButton
                  sx={{
                    color: "#db5e5e",
                  }}
                >
                  <a
                    href={notesData.items[0].pdfURL}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DownloadIcon />
                  </a>
                </IconButton>
              </CardActions>
            </React.Fragment>
          ) : (
            <CardContent sx={{ width: "100%" }}>
              <Skeleton
                variant="rectangular"
                sx={{ width: "400px", height: "100%" }}
              />
            </CardContent>
          )}
        </Card>
        {pending ? (
          <React.Fragment>
            <Typography variant="h6" gutterBottom component="div" m={5}>
              Status: Pending Final Doctor Note
              <Tooltip title="Please wait a few minutes!">
                <IconButton sx={{ paddingTop: "0px", paddingLeft: "4px" }}>
                  <InfoIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </React.Fragment>
        ) : (
          <Typography variant="h6" gutterBottom component="div" m={5}>
            Status: Final Doctor Note Available
            <Tooltip title="Please download the PDF Note!">
              <IconButton sx={{ paddingTop: "0px", paddingLeft: "4px" }}>
                <InfoIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
      </Box>
    </div>
  );
}
