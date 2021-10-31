import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { User } from "../../services/firebase/user";
import { toCurrencyValue } from "../InputWithPrefix/InputWithPrefix";

interface UserInformationDialogProps {
  open: boolean;
  handleClose: () => void;
  user: User;
}

const UserInformationDialog: React.FC<UserInformationDialogProps> = ({
  open,
  handleClose,
  user,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ fontSize: 32, fontWeight: 600 }}>
        {user.name}
      </DialogTitle>
      <DialogContent>
        <Typography style={{ fontSize: 24, fontWeight: 600 }}>
          {toCurrencyValue(user.value)}
        </Typography>
        <TextField
          style={{ marginTop: 32 }}
          label="Informações"
          fullWidth
          defaultValue={user.info}
          InputProps={{
            readOnly: true,
          }}
          multiline
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserInformationDialog;
