import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";

interface ITokenBalanceInput {
  balance?: number;
}

const styleForm = makeStyles (theme=>({
  isi:{
    color : '#fff',
    backgroundColor : '#fff',
    border : '1px solid #fff',

  }
}))

const TokenSelectInput: React.FC<ITokenBalanceInput> = (
  props: ITokenBalanceInput
) => {
  const { balance } = props;
  const classes = styleForm();

  return (
    <Box sx={{ flexGrow: 1}}>
      <FormControl fullWidth disabled={false} >
        <TextField className={classes.isi}
          disabled={true}
          fullWidth
          variant="standard"
          label="Balance"
          helperText=" "
          value={balance}
        />
      </FormControl>
    </Box>
  );
};

export default TokenSelectInput;
