import React from "react";
import { useController } from "react-hook-form";
// import { Button, FormikTextInput } from "@chainsafe/common-components";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { InputAdornment, Slider, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

interface ITokenInput {
  disabled?: boolean;
  label: string;
  name: string;
  tokens: Tokens;
  tokenSelectorKey: string;
  classNames?: {
    input?: string;
    button?: string;
  };
  setValue?: any;
  control?: any;
}
const marks = [
  {
    value: 0,
    color : '#fff'
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}
const TokenInput: React.FC<ITokenInput> = ({
  classNames,
  disabled,
  label,
  tokens,
  tokenSelectorKey,
  name,
  setValue,
  control,
}: ITokenInput) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Box sx={{ height: '40px' }}>
          <div>
        <Typography  sx={{
                   marginTop : '20px',
                  color : "#b9c5cb", fontSize : '12px', marginBottom : '5px',
                }}
              variant="body1">amount to send
              </Typography>
          </div>
      <TextField
      // inputProps={{ style: { color: "red", } }}
       sx={{ 
        input: { color: '#fff', },
        label: { color: '#b9c5cb', fontSize: '15px'},
      width : '450px', 
      color : '#fff', 
      border :'1px solid #4c4f5c',
          borderRadius : '10px',
          fontSize : '15px',
          padding : '5px',
      }} 
        variant="standard"
        disabled={disabled}
        error={!!fieldState.error}
        fullWidth
        helperText={fieldState.error ? fieldState.error.message : undefined}
        className={classNames?.input}
        // label={label}
        {...field}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{color: '#4c4f5c'}}>
              <PriceChangeIcon  />
            </InputAdornment>
          ),
          endAdornment: (
            <Button sx={{
              backgroundColor : '#3a3d47',
              color : '#fff',
              ":hover": {
                backgroundColor: "#4c4f5c",
                opacity: 0.9,
              },
              ":disabled": {
                backgroundColor : '#3a3c48',
                color : '#6a7287'
              },
            }}
              disabled={disabled || !tokens[tokenSelectorKey]}
              className={classNames?.button}
              onClick={() => {
                setValue(name, tokens[tokenSelectorKey].balance);
              }}
              variant="contained"
              type="button"
            >
              MAX
            </Button>
          ),
        }}
        
      />
      {/* <Slider sx={{
        color : '#fff',
        marginRight : '20px',
        }}
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={25}
        valueLabelDisplay="auto"
        marks={marks}
      /> */}
    </Box>
  );
};

export default TokenInput;
