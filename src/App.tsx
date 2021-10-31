import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Add, Create, Delete } from "@material-ui/icons";
import theme from "./theme/defaultTheme";
import { editUser, getUsers, removeUser, User } from "./services/firebase/user";
import styled from "styled-components";
import AddUserDialog from "./components/AddUserDialog";
import NotYesDialog from "./components/NotYesDialog";
import { toast } from "react-toastify";
import UserInformationDialog from "./components/UserInformationDialog";

const styles = {
  addUserButton: {
    backgroundColor: theme.palette.green.main,
    margin: 24,
  },
};

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

type TableCellMonthsProps = {
  isPaid: boolean;
};

const TableMonths = styled(Box)<TableCellMonthsProps>`
  background-color: ${({ isPaid }) =>
    isPaid ? theme.palette.green.main : theme.palette.error.main};
  cursor: pointer;
  height: 63px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s ease-out, transform 0.1s ease-out;
  &:hover {
    filter: brightness(75%);
    transform: scale(1.1);
  }
`;

type TableCellUserProps = {
  isRented: boolean;
};

const TableCellUser = styled(TableCell)<TableCellUserProps>`
  cursor: pointer;
  font-weight: 600;
  transition: filter 0.2s ease-out, transform 0.1s ease-out;
  background-color: ${({ isRented }) =>
    isRented ? theme.palette.warning.main : undefined};
  &:hover {
    filter: brightness(75%);
    transform: scale(1.1);
  }
`;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState("");

  const [initialData, setInitialData] = useState<User>({} as User);

  const [openUserInformation, setOpenUserInformation] = useState<User>(
    {} as User
  );

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };
  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
    setInitialData({} as User);
  };

  const handleRemoveUser = () => {
    removeUser(removeDialog).then(() => {
      toast.success("Usuário removido com sucesso!");
      setRemoveDialog("");
    });
  };

  const handleEdit = (v: User) => {
    setInitialData(v);
    setOpenAddUserDialog(true);
  };

  const ToggleDay = (id: string, user: User, index: number) => {
    const date = new Date();
    const today = date.getDate();

    const newUser: User = {
      ...user,
      months: user.months.map((v, i) =>
        i === index ? (!!v ? "" : String(today)) : v
      ),
    };
    editUser(id, newUser);
  };

  const handlecloseUserInformation = () => {
    setOpenUserInformation({} as User);
  };

  useEffect(() => {
    getUsers((userDb) => {
      setUsers(userDb);
    });
  }, []);

  return (
    <>
      <NotYesDialog
        title="Remover usuário"
        open={!!removeDialog}
        onNotClick={() => setRemoveDialog("")}
        onYesClick={handleRemoveUser}
      />
      <UserInformationDialog
        open={!!openUserInformation.name}
        user={openUserInformation}
        handleClose={handlecloseUserInformation}
      />
      <AddUserDialog
        open={openAddUserDialog}
        onClose={handleCloseAddUserDialog}
        initialData={initialData}
      />
      <Typography
        style={{
          fontSize: 48,
          margin: "24px auto 0 auto",
          textAlign: "center",
        }}
      >
        Box Tv
      </Typography>
      <Button
        onClick={handleOpenAddUserDialog}
        variant="contained"
        startIcon={<Add />}
        style={styles.addUserButton}
      >
        adicionar usuario
      </Button>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="center">Nome</TableCell>
            {months.map((month) => (
              <TableCell align="center" key={month}>
                {month}
              </TableCell>
            ))}
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow>
              <TableCell align="left" style={{ maxWidth: 30 }}>
                {index + 1}
              </TableCell>
              <TableCellUser
                isRented={user.isRented}
                align="center"
                onClick={() => setOpenUserInformation(user)}
              >
                {user.name}
              </TableCellUser>
              {user.months.map((month, index) => (
                <TableCell style={{ padding: 5 }}>
                  <TableMonths
                    isPaid={!!month}
                    key={index}
                    onClick={() => ToggleDay(user.id ?? "", user, index)}
                  >
                    <Typography
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#FFF",
                      }}
                    >
                      {month}
                    </Typography>
                  </TableMonths>
                </TableCell>
              ))}
              <TableCell
                align="right"
                style={{
                  paddingRight: 8,
                  width: 80,
                }}
              >
                <IconButton onClick={() => handleEdit(user)}>
                  <Create />
                </IconButton>
                <IconButton onClick={() => setRemoveDialog(user.id ?? "")}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
