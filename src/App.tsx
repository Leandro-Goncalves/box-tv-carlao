import React, { useEffect, useRef, useState } from "react";
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
  Grid,
  Pagination,
} from "@material-ui/core";
import { Add, Create, Delete } from "@material-ui/icons";
import theme from "./theme/defaultTheme";
import {
  currentYearIndex,
  editUser,
  getUsers,
  removeUser,
  User,
} from "./services/firebase/user";
import styled from "styled-components";
import AddUserDialog from "./components/AddUserDialog";
import NotYesDialog from "./components/NotYesDialog";
import { toast } from "react-toastify";
import UserInformationDialog from "./components/UserInformationDialog";
import SearchBar from "./components/SearchBar";
// import useLongPress from "./hooks/useLongPress";
import UserAddDayDialog from "./components/UserAddDayDialog";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { TopBar } from "./components/TopBar/TopBar";

const styles = {
  addUserButton: {
    backgroundColor: theme.palette.green.main,
    margin: 24,
    marginRight: 0,
  },
};

const monthsNull = [
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
];

export const months = [
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
  width: 63px;
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
  const containerRef = useRef<any>(null);
  const NameRef = useRef<HTMLTableCellElement>(null);
  const MonthRef = useRef<HTMLTableCellElement>(null);
  const ActionsRef = useRef<HTMLTableCellElement>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 50;

  const [users, setUsers] = useState<User[]>([]);
  const [usersDb, setUsersDb] = useState<User[]>([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState("");
  const [openUserAddDayDialog, setOpenUserAddDayDialog] = useState(false);
  const [currentYear, setCurrentYear] = useState(
    Number(localStorage.getItem("currentYear")) || new Date().getFullYear()
  );
  // const [openUserAddDayDialogValue, setOpenUserAddDayDialogValue] =
  //   useState<any>();

  const [initialData, setInitialData] = useState<User>({} as User);

  const [openUserInformation, setOpenUserInformation] = useState<User>(
    {} as User
  );

  const [searchBar, setSearchBar] = useState("");

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
    const yearIndex = currentYearIndex(user);

    if (!yearIndex.months) {
      return;
    }

    const month = yearIndex.months[index];
    month.value = !!month.value ? "" : String(today);

    editUser(id, user);
  };

  const handlecloseUserInformation = () => {
    setOpenUserInformation({} as User);
  };

  const filterFunction = (user: any) => {
    const search = searchBar.toLowerCase();
    return user.name.toLowerCase().includes(search);
  };

  useEffect(() => {
    setUsers(usersDb.filter(filterFunction));
  }, [searchBar, usersDb]);

  useEffect(() => {
    getUsers((userDb) => {
      setUsersDb(userDb);
    });
  }, []);

  // const onLongPress = (e: any, value: any) => {
  //   setOpenUserAddDayDialogValue(value);
  //   setOpenUserAddDayDialog(true);
  // };

  // const onClick = () => {};

  // const defaultOptions = {
  //   shouldPreventDefault: true,
  //   delay: 500,
  // };

  // const longPressEvent = useLongPress({
  //   onLongPress,
  //   onClick,
  //   shouldPreventDefault: defaultOptions.shouldPreventDefault,
  //   delay: defaultOptions.delay,
  // });

  const handleCurrentYear = (value: number) => {
    setCurrentYear(value);
    localStorage.setItem("currentYear", value.toString());
  };
  return (
    <Box style={{ width: "100%" }}>
      <TopBar MonthRef={MonthRef} containerRef={containerRef} />
      {openUserAddDayDialog && (
        <UserAddDayDialog
          isOpen={openUserAddDayDialog}
          onClose={() => setOpenUserAddDayDialog(false)}
          value={false}
        />
      )}

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
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => handleCurrentYear(currentYear - 1)}>
          <ArrowBack />
        </IconButton>
        <Typography
          style={{
            fontSize: 24,
          }}
        >
          {currentYear}
        </Typography>
        <IconButton onClick={() => handleCurrentYear(currentYear + 1)}>
          <ArrowForward />
        </IconButton>
      </Box>
      <Grid container style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Grid item>
          <Button
            onClick={handleOpenAddUserDialog}
            variant="contained"
            startIcon={<Add />}
            style={styles.addUserButton}
          >
            adicionar usuario
          </Button>
        </Grid>
        <Grid item>
          <SearchBar value={searchBar} onSearch={(v) => setSearchBar(v)} />
        </Grid>
      </Grid>

      <Box style={{ overflow: "scroll", width: "100%" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: 28 }} ref={containerRef}>
                id
              </TableCell>
              <TableCell align="center" ref={NameRef}>
                Nome
              </TableCell>
              {months.map((month, index) => (
                <TableCell
                  align="center"
                  key={month}
                  style={{ width: 100 }}
                  ref={index === 0 ? MonthRef : undefined}
                >
                  {month}
                </TableCell>
              ))}
              <TableCell align="right" ref={ActionsRef}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(
                0 + rowsPerPage * (page - 1),
                rowsPerPage + rowsPerPage * (page - 1)
              )
              .map((user, index) => (
                <TableRow>
                  <TableCell align="left" style={{ maxWidth: 30 }}>
                    {index + 1 + rowsPerPage * (page - 1)}
                  </TableCell>
                  <TableCellUser
                    isRented={user.isRented}
                    align="center"
                    onClick={() => setOpenUserInformation(user)}
                  >
                    {user.name}
                  </TableCellUser>
                  {(currentYearIndex(user).months ?? monthsNull).map(
                    (month, index) => (
                      <TableCell style={{ padding: 5 }}>
                        <TableMonths
                          isPaid={!!month.value}
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
                            {month.value}
                          </Typography>
                        </TableMonths>
                      </TableCell>
                    )
                  )}
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
      </Box>
      {users.length > rowsPerPage && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 0",
          }}
        >
          <Pagination
            count={Math.ceil(users.length / rowsPerPage)}
            page={page}
            onChange={(_, v) => setPage(v)}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
