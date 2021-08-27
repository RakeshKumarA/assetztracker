import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { useDispatch, useSelector } from "react-redux";
import { downloadAssets } from "../../reducers/downloadAssetSlice";
import Button from "@material-ui/core/Button";
import { unAssignAsset } from "../../reducers/employeeSlice";
import { viewAssetAudit } from "../../reducers/viewAssetAuditSlice";
import CloseIcon from "@material-ui/icons/Close";
import { AppBar, Dialog, Slide } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "assetId",
    numeric: true,
    disablePadding: true,
    label: "ASSET ID",
  },
  { id: "cost", numeric: true, disablePadding: false, label: "COST" },
  { id: "vendor", numeric: false, disablePadding: false, label: "VENDOR" },
  {
    id: "empid",
    numeric: true,
    disablePadding: false,
    label: "EMP ID",
  },
  {
    id: "assetStatus",
    numeric: true,
    disablePadding: false,
    label: "ASSET STATUS",
  },
  {
    id: "assetAddedBy",
    numeric: true,
    disablePadding: false,
    label: "ASSET ADDED BY",
  },
  {
    id: "assetAudit",
    numeric: false,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    checkboxres,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={
              !checkboxres && numSelected > 0 && numSelected < rowCount
            }
            checked={!checkboxres && rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all assets" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({
  Selected,
  Screen,
  assetSelected,
  checkboxres,
  rows,
}) => {
  const classes = useToolbarStyles();
  const dispatch = useDispatch();
  const numSelected = Selected.length;

  const handleDownloadClick = (Selected) => {
    dispatch(downloadAssets(Selected));
  };

  const assignClick = (e) => {
    assetSelected(Selected);
    e.preventDefault();
  };
  const unassignClick = (e) => {
    dispatch(unAssignAsset(Selected[0]));
    window.location.reload();
  };

  const selectedStatus =
    Selected[0] && rows.filter((row) => row.id === Selected[0])[0].assetStatus;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: !checkboxres && numSelected > 0,
      })}
    >
      {!checkboxres && numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Asset List
        </Typography>
      )}
      {!checkboxres &&
      numSelected === 1 &&
      Screen === "viewScreen" &&
      selectedStatus !== "Assigned" ? (
        <Tooltip title="Assign">
          <Button variant="contained" color="secondary" onClick={assignClick}>
            Assign
          </Button>
        </Tooltip>
      ) : !checkboxres &&
        numSelected === 1 &&
        Screen === "viewScreen" &&
        selectedStatus === "Assigned" ? (
        <Tooltip title="Assign">
          <Button variant="contained" color="secondary" onClick={unassignClick}>
            Unassign
          </Button>
        </Tooltip>
      ) : null}
      {!checkboxres && numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton
            aria-label="delete"
            onClick={() => handleDownloadClick(Selected)}
          >
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  Selected: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomTable = ({ rows, screen, assetSelected, checkboxres }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { assetaudit } = useSelector((state) => state.assetAudit);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("assetId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleAuditClick = (id) => {
    dispatch(viewAssetAudit(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          Selected={selected}
          Screen={screen}
          assetSelected={assetSelected}
          checkboxres={checkboxres}
          rows={rows}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              checkboxres={checkboxres}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={checkboxres ? false : isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.assetId}
                      </TableCell>
                      <TableCell align="center">{row.cost}</TableCell>
                      <TableCell align="center">{row.vendor}</TableCell>
                      <TableCell align="center">{row.empid}</TableCell>
                      <TableCell align="center">{row.assetStatus}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleAuditClick(row.id)}>
                          <FindInPageIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="initial">
              Audit
            </Typography>
          </Toolbar>
        </AppBar>
        <Timeline align="alternate" style={{ paddingTop: "5rem" }}>
          {assetaudit.map((asset) => (
            <TimelineItem key={asset.transactionid}>
              <TimelineSeparator>
                {asset.empid ? (
                  <TimelineDot color="secondary" />
                ) : (
                  <TimelineDot />
                )}

                <TimelineConnector />
              </TimelineSeparator>
              {asset.empid ? (
                <TimelineContent>
                  {asset.transactiontype} to {asset.empname}
                </TimelineContent>
              ) : (
                <TimelineContent>{asset.transactiontype}</TimelineContent>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      </Dialog>
    </div>
  );
};

export default CustomTable;
