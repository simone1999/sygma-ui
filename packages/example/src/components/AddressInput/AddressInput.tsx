import React, { useCallback, useState } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { color } from "@mui/system";
import { InputAdornment, Typography } from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactsIcon from '@mui/icons-material/Contacts';

interface IAddressInput {
  senderAddress: string;
  className?: any;
  placeholder: string;
  name: string;
  label: string;
  disabled: boolean;
  sendToSameAccountHelper?: boolean;
  control?: any;
  classNames?: any;
  setValue?: any;
}

const AddressInput: React.FC<IAddressInput> = ({
  senderAddress,
  placeholder,
  name,
  label,
  sendToSameAccountHelper = false,
  control,
  setValue,
  disabled,
  ...rest
}: IAddressInput) => {
  const { field, fieldState } = useController({ name, control });

  const [stored, setStored] = useState<string | undefined>();

  const toggleReceiver = useCallback(() => {
    if (stored === undefined) {
      setStored(field.value);
      setValue(name, senderAddress);
    } else {
      setValue(name, "");
      setStored(undefined);
    }
  }, [name, senderAddress, field, setStored, setValue]);

  return (
    <FormControl  sx={{ color: '#fff' }} disabled={disabled} fullWidth>
      <>
      {/* <Typography  sx={{
                   marginTop : '20px',
                  color : "#b9c5cb", fontSize : '12px', 
                }}
              variant="body1">Address</Typography> */}
               <div>
        <Typography  sx={{
                   marginTop : '20px',
                  color : "#b9c5cb", fontSize : '12px', marginBottom : '5px',
                }}
              variant="body1">destination address
              </Typography>
          </div>

        <TextField  sx={{ 
              input: { color: '#fff', },
              label: { color: '#b9c5cb', fontSize: '15px'},
            width : '450px', 
            color : '#fff', 
            border :'1px solid #4c4f5c',
            borderRadius : '10px',
            fontSize : '15px',
            padding : '5px',
        }} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{color: '#4c4f5c'}}>
              <AssignmentIndIcon  />
            </InputAdornment>
          ),
        }}
          variant = "standard"
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : undefined}
          fullWidth
          {...field}
          // label={label}
          placeholder={placeholder}
          disabled={Boolean(disabled && !stored)}
        />
      </>
      {sendToSameAccountHelper && (
        <FormGroup sx={{ my: 1 , color: '#fff'}}>
          
          <FormControlLabel sx={{ fontSize: '12px', color : '#babcc0', fontFamily : "sans-serif"}}
            control={
              <Checkbox sx={{
                  color : '#fff',
                }}
                size="small"
                checked={stored !== undefined}
                onChange={() => toggleReceiver()}
              />
            }
            disableTypography = {true}
            label="I want to send funds to my address"
          />
        </FormGroup>
      )}
    </FormControl>
  );
};

export default AddressInput;
