import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import Invest from "./Invest";

export default function PitchDetails(props) {
  const [pitch, setPitch] = useState(props.pitch);
  //   const pitch = props.pitch;
  const [edit, setEdit] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(props.pitch);
  const [openInvestModal, setOpenInvestModal] = useState(false);

  useEffect(() => {
    setPitch(props.pitch);
    console.log(pitch);
    setCurrentPitch(props.pitch);
  }, [props.pitch]);

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity,
  } = useContext(ToastContext);

  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
    textStyle: {
      display: "flex",
      justifyContent: "start",
    },
  };

  const handleChange = (event, prop) => {
    setPitch({ ...pitch, [prop]: event.target.value });
  };

  const cancelHandle = () => {
    setPitch(currentPitch);
    console.log(currentPitch);
    setEdit(false);
  };

  const editHandle = () => {
    setEdit(true);
  };

  const saveHandle = () => {
    axios
      .put("/api/updatePitch", { updatedPitch: pitch })
      .then((response) => {
        setOpenToast(true);
        setSeverity("success");
        setToastContent(response.data.message);
        setEdit(false);
        props.closePitchDetailModal(null, true);
      })
      .catch((err) => {
        setOpenToast(true);
        setSeverity("success");
        setToastContent(err.response.data.message);
      });
  };

  const closeInvestModal = () => {
    setOpenInvestModal(false);
  }
  return (
    pitch && (
      <Dialog
        open={props.openDetail}
        onClose={props.closePitchDetailModal}
        fullWidth
      >
        <DialogTitle>{pitch.idea_name}</DialogTitle>
        <DialogContent>
          {edit ? (
            <Box>
              <TextField
                required
                id="outlined-required"
                label="Idea Name"
                style={styles.textField}
                value={pitch.idea_name}
                onChange={(e) => handleChange(e, "idea_name")}
              />
              <TextField
                required
                id="outlined-required"
                label="Short Description"
                style={styles.textField}
                value={pitch.short_description}
                onChange={(e) => handleChange(e, "short_description")}
              />
              <TextField
                required
                id="outlined-required"
                label="Long Description"
                style={styles.textField}
                value={pitch.long_description}
                onChange={(e) => handleChange(e, "long_description")}
              />
              <TextField
                required
                id="outlined-required"
                label="Valuation"
                style={styles.textField}
                value={pitch.company_valuation}
                type="number"
                onChange={(e) => handleChange(e, "company_valuation")}
              />
              <TextField
                required
                id="outlined-required"
                label="Equity"
                style={styles.textField}
                value={pitch.equity}
                type="number"
                onChange={(e) => handleChange(e, "equity")}
              />
              <TextField
                required
                id="outlined-required"
                label="Progress So Far"
                style={styles.textField}
                value={pitch.progress}
                onChange={(e) => handleChange(e, "progress")}
              />
              <TextField
                required
                id="outlined-required"
                label="Plan"
                style={styles.textField}
                value={pitch.plan}
                onChange={(e) => handleChange(e, "plan")}
              />
            </Box>
          ) : (
            <>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>Summary: </Typography>
                &nbsp;
                <Typography>{pitch.short_description}</Typography>
              </div>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>Details: </Typography>
                &nbsp;
                <Typography>{pitch.long_description}</Typography>
              </div>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>Valuation: </Typography>
                &nbsp;
                <Typography>{pitch.company_valuation}$</Typography>
              </div>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Proposed Equity (%):{" "}
                </Typography>
                &nbsp;
                <Typography>{pitch.equity}%</Typography>
              </div>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Progress So Far:{" "}
                </Typography>
                &nbsp;
                <Typography>{pitch.progress}</Typography>
              </div>
              <div style={styles.textStyle}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Future Plan:{" "}
                </Typography>
                &nbsp;
                <Typography>{pitch.plan}</Typography>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {props.userRole == 2 ? (
            edit ? (
              <>
                <Button onClick={saveHandle}>Save</Button>
                <Button onClick={cancelHandle}>Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={editHandle}>Edit</Button>
                <Button onClick={props.closePitchDetailModal}>Close</Button>
              </>
            )
          ) : (
            <>
              <Button onClick={() => setOpenInvestModal(true)}>Accept</Button>
              <Button onClick={props.closePitchDetailModal}>Close</Button>
            </>
          )}
        </DialogActions>
        <Invest pitch={pitch} openInvestModal={openInvestModal} closeInvestModal={closeInvestModal} />
      </Dialog>
    )
  );
}
