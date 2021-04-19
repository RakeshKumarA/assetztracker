import React from "react";
import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
 import DeleteIcon from '@material-ui/icons/Delete';
 import Paper from '@material-ui/core/Paper';
 import {
  IconButton,
} from '@material-ui/core';
import { Grid,  TableHead,Typography } from '@material-ui/core';
import { removeUser, searched_user } from "../../reducers/viewUserSlice";
import { set_snackbar } from '../../reducers/snackSlice';
 import TableRow from '@material-ui/core/TableRow';
//MUI Libs
import {
  Button,
 
  TextField as TextFieldMaterial,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Formik Imports
import { Formik, Form } from "formik";

//Import Validation Schema
import axios from "axios";
import {  useSelector, useDispatch } from 'react-redux';
//Modular Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { viewUsers,searcheduser } from "../../reducers/viewUserSlice";



const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "80%",
    width: "90%",
  },

  title: {
    padding: "1rem 0",
  },
  formStyle: {
    display: "flex",
    justifyContent: "center",
  },
});

const SearchUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  dispatch(viewUsers());
  const { view } =useSelector((state) => state.viewusers);
  const { searcheduser } =useSelector((state) => state.viewusers);
  
  
const Search = (name) => {
  
   console.log(name);
    const value2 = view.filter(
     (value) => value.name === name
   )
  {if(value2!=""){
    dispatch(searched_user(value2));
  }
else if(value2 == ""){
  
    dispatch(
        set_snackbar({
          snackbarOpen: true,
          snackbarType: 'error',
          snackbarMessage: 'User not Found',
        })
      );
}}
 }
 const handleDelete = (id) => {
    axios.post("/api/users/remove",{
      userid:id
    })
   }


  const initialValues = {
    name:'',
  };

  return (
   <Grid container>
     <Grid item container justify="center">
    <Formik
    initialValues={initialValues}
    onSubmit={(values, { resetForm }) => {
      const { name } = values;
   
   Search(name);
      resetForm();
    }}>
        {({ submitForm }) => (
        <Form className={classes.formStyle}>
    <Grid item container spacing={2}>
    <Grid item container direction="row" style={{minWidth:"30vw"}}>
            <Grid item   >
              <CustomTextField style={{minWidth:"30vw",paddingRight:"2rem"}} name="name" label="Search" />
            </Grid>
            <Grid item >
              <Button
                variant="contained"
                color="secondary"
                onClick={submitForm}
              >
                Search
              </Button>
            </Grid>
            </Grid>
          </Grid>
        </Form>
       
)}

</Formik>
</Grid>

    
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{marginTop:"2vh"}}
            >
               {(searcheduser!="")&&<TableContainer >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' >Name</TableCell>
                  <TableCell  align='center' >Email</TableCell>
                  <TableCell  align='center' >Role</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searcheduser.map((row) => (
                  <TableRow key={row.userid}>
                    <TableCell component="th" scope="row" align='center'>
                      {row.name}
                    </TableCell>
                    <TableCell  align='center' >{row.email}</TableCell>
                    <TableCell  align='center' >
                      {/* {format(row.expDate, "yyyy-mm-dd")} */}
                      {row.role}
                    </TableCell>
                    <TableCell align="center" padding="none"> 
                     {(row.role !=="admin")&&<IconButton
                        size="small"
                        onClick={() => handleDelete(row.userid)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
  }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>}
            </Grid>
          
        </Grid>





 
  
  
          
)}
            
        
         
            
            
           
           
           
           
       
    
 

export default SearchUser;




        // <div className={classes.search}>
        //      <InputBase
        //        placeholder="Search…"
        //        classes={{
        //          root: classes.inputRoot,
        //          input: classes.inputInput,
        //        }}
        //        inputProps={{ 'aria-label': 'search' }}
        //      /> 
        
