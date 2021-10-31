import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Slide,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addUser, editUser, User } from "../../services/firebase/user";
import theme from "../../theme/defaultTheme";
import InputWithPrefix from "../InputWithPrefix";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: User;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [informations, setInformations] = useState("");
  const [isRented, setIsRented] = useState(false);
  const [months, setMonths] = useState<Array<string>>([]);

  const handleClose = () => {
    setName("");
    setValue(0);
    setInformations("");
    setIsRented(false);
    setId("");
    setMonths([]);
    onClose();
  };

  const handleAddUser = () => {
    if (id) {
      editUser(id, {
        name,
        value,
        isRented,
        months,
        info: informations,
      }).then(() => {
        toast.success("Usuário editado");
        handleClose();
      });
      return;
    }
    const date = new Date();

    const thisMonth = date.getMonth();
    const thisDay = date.getDate();
    const _months = [];

    for (let i = 0; i < 12; i++) {
      _months.push(thisMonth >= i ? String(thisDay) : "");
    }

    const user: User = {
      name,
      value,
      isRented,
      months: _months,
      info: informations,
    };
    addUser(user).then(() => {
      toast.success("Usuário adicionado");
      handleClose();
    });
  };

  useEffect(() => {
    if (initialData?.id) {
      setMonths(initialData.months);
      setId(initialData.id);
      setName(initialData.name);
      setValue(initialData.value);
      setInformations(initialData.info);
      setIsRented(initialData.isRented);
    }
  }, [initialData]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      fullWidth
      maxWidth="xs"
      style={{ padding: 24 }}
    >
      <DialogTitle>Adicionar Usuario</DialogTitle>
      <DialogContent
        style={{
          padding: 20,
          display: "flex",
          gap: 8,
          flexDirection: "column",
        }}
      >
        <TextField
          label="Nome"
          type="text"
          fullWidth
          value={name}
          required
          onChange={(v) => setName(v.target.value)}
        />
        <TextField
          focused
          value={value * 100}
          onChange={(v) => setValue(Number(v.target.value))}
          label="Valor"
          type="text"
          fullWidth
          required
          InputProps={{
            inputComponent: InputWithPrefix,
          }}
        />

        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Typography>Alugado:</Typography>
          <FormControlLabel
            value={isRented}
            control={
              <Switch
                style={{
                  color: theme.palette.green.main,
                }}
                name="status"
                checked={isRented}
                onChange={(_, v) => setIsRented(v)}
              />
            }
            label={isRented ? "Sim" : "Não"}
          />
        </Box>
        <TextField
          label="informações"
          multiline
          value={informations}
          onChange={(v) => setInformations(v.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ backgroundColor: theme.palette.error.main }}
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: theme.palette.green.main }}
          onClick={handleAddUser}
          disabled={!name}
        >
          {!!id ? "Editar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
