import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { currentYearIndex, editUser } from "../../services/firebase/user";
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

interface UserAddDayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  value: any;
}

const UserAddDayDialog = ({
  isOpen,
  onClose,
  value,
}: UserAddDayDialogProps) => {
  const [selectedDay, setSelectedDay] = useState("");

  const editDay = () => {
    const user = value.user;
    const id = user.id;
    const index = value.index;

    if (isNaN(Number(selectedDay))) {
      toast.error("Dia inválido");
      return;
    } else if (!selectedDay) {
      toast.error("Selecione um dia");
      return;
    } else if (Number(selectedDay) > 31) {
      toast.error("Dia inválido");
      return;
    }

    const yearIndex = currentYearIndex(user);
    if (!yearIndex.months) {
      onClose();
      return;
    }

    const month = yearIndex.months[index];
    month.value = selectedDay;

    editUser(id, user);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <Typography style={styles.title}>Editar dia</Typography>
      <DialogContent>
        <TextField
          fullWidth
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          style={{
            backgroundColor: theme.palette.warning.main,
            color: "white",
          }}
          onClick={editDay}
        >
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAddDayDialog;
