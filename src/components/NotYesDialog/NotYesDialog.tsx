import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Typography } from "@material-ui/core";
import theme from "../../theme/defaultTheme";

const styles = {
  title: {
    fontSize: 20,
    lineHeight: "24.38px",
    fontWeight: 600,
    marginBottom: 18,
    padding: "32px 32px 0 32px",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: "20px",
    fontWeight: 400,
    marginBottom: 10,
    padding: "0 32px 0 32px",
  },
};

type AlertDialogProps = {
  open: boolean;
  title: string;
  yesLabel?: string;
  notLabel?: string;
  onYesClick: () => void;
  onNotClick: () => void;
};

const NotYesDialog: React.FC<AlertDialogProps> = (props) => {
  const {
    open,
    title,
    yesLabel = "SIM",
    notLabel = "NÃO",
    onNotClick,
    onYesClick,
    children,
  } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Typography style={styles.title}>{title}</Typography>
      <Typography style={styles.subtitle}>{children}</Typography>
      <DialogActions style={{ padding: "0 32px 32px 32px" }}>
        <Button
          onClick={onNotClick}
          style={{ color: theme.palette.error.main }}
        >
          {notLabel}
        </Button>
        <Button
          onClick={onYesClick}
          style={{ color: theme.palette.green.main }}
          autoFocus
        >
          {yesLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotYesDialog;
