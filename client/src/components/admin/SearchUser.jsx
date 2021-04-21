import React, {useEffect} from "react";
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
import {set_snackbar} from "../../reducers/snackSlice";

 import TableRow from '@material-ui/core/TableRow';
//MUI Libs
import {
  Button,
 
  
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//Formik Imports
import { Formik, Form } from "formik";

//Import Validation Schema
import {  useSelector, useDispatch } from 'react-redux';
//Modular Imports
import CustomTextField from "../customcomponents/CustomTextField";
import { viewUsers,searchUsers,deleteUsers } from "../../reducers/viewUserSlice";



const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
  },
  cardContainer: {
    height: "100vh",
    width: "90%",
  },

  paperStyle: {
    paddingTop:"4vh",
    width: "100%",
  },
  title:{
      paddingBottom:"1.5rem",
  },
  
 formcontainer:{
     paddingBottom:'1.5rem',
 }
});

const SearchUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  
  const { view } =useSelector((state) => state.viewusers);
  const { userInfo } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(viewUsers());  
 },[])
   
const resetUserHandler =() => {
  dispatch(viewUsers());
}



  const Search = (name) => {
    if(name != ""){
  dispatch(searchUsers(name));
  }
else {
  dispatch(
    set_snackbar({
      snackbarOpen: true,
      snackbarType: "warning",
      snackbarMessage: "Please Enter Name",
      snackbarSeverity:"warning",
    })
  );
}}
 const handleDelete = (id) => {
   console.log(id);
   dispatch(deleteUsers(id))
   }
  const initialValues = {
    name:'',
  };
  return (
    <Grid
    container
    className={classes.container}
    justify="center"
    alignItems="center"
  >
    <Grid >
    <Typography  variant="h4"
    color="initial"
    textAlign="center"
     className={classes.title}>View  Users
      </Typography> 
    </Grid>  
<Grid
     container
     className={classes.container}
     justify="center"
     alignItems="center"
   >
     <Grid item container className={classes.cardContainer} spacing={2}>
     <Paper className={classes.paperStyle}>
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
    <Grid item container >
    
    <Grid item container direction="row" style={{minWidth:"30vw"}}>
    
            <Grid item   >
              <CustomTextField style={{minWidth:"30vw",paddingRight:"2rem"}} name="name" label="Search By Name" />
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
            <Grid item style={{marginLeft:"2vw"}} >
              <Button
                variant="contained"
                color="primary"
               onClick={resetUserHandler}
              >
                Reset 
              </Button>
            </Grid>
            </Grid>
          </Grid>
        </Form>     
)}
</Formik>
</Grid>

       <Grid item container sm={10} style={{margin:"1rem 4rem"}} justify ="center" >         
         <Paper className={classes.paperStyle}>
           <Grid
             item
             container
             direction="column"
             justify="center"
             alignItems="center"
             
           >
              <TableContainer >
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
               {view.map((row) => (
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
                    {(row.role !=="admin") && (userInfo.role ==="admin")&&<IconButton
                       size="small"
                        onClick={() => handleDelete(row.userid)}
                      
                     >
                       <DeleteIcon  fontSize="small" />
                     </IconButton>
 }
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
           </Grid>
         </Paper>
       </Grid>
       </Paper>
     </Grid>
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
        
