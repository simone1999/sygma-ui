import React, { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import styled from "styled-components";

interface ISelectDestinationNetwork {
  disabled?: boolean;
  label?: string;
  options?: any;
  onChange?: any;
  value?: number;
}

const SelectDestinationNetwork: React.FC<ISelectDestinationNetwork> = ({
  disabled,
  label,
  options,
  onChange,
  value,
}: ISelectDestinationNetwork) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <FormControl  hiddenLabel sx={{ borderColor :"#fff" }} fullWidth disabled={disabled}  >
    <Typography  
      sx={{
      marginTop : '20px',
      color : "#b9c5cb", fontSize : '12px', marginBottom : '5px',
      }}
      variant="body1">Destination network
    </Typography>
    {/* <InputLabel  sx={{  color : '#b9c5cb', }} id="select-destination-network-label">{label}</InputLabel> */}
    <Select  
    sx={{
      color : '#fff', 
      height : '45px',
      border :'1px solid #4c4f5c',
      borderRadius : '10px',
      fontSize : '15px', }}
      labelId="select-destination-network-label"
      id="select-destination-network"
      onChange={handleChange}
      // label={label}
      value={value ? value.toString() : ""}
    >
      {options.map((option: { label: any; value: any }) => (
        <MenuItem   
          key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );
};

export default SelectDestinationNetwork;
