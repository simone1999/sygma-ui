import React from "react";
import { SelectInput } from "@chainsafe/common-components";
import { Typography, Button } from "@mui/material";

import { WalletType } from "@chainsafe/chainbridge-ui-core";
import { BridgeConfig } from "../../chainbridgeConfig";

import { ConnectionDialog } from "../../modules";
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import LoginIcon from '@mui/icons-material/Login';

type HomeNetworkConnectViewProps = {
  isReady: boolean | undefined;
  classes: any;
  setWalletType: (walletType: WalletType) => void;
  walletType: string;
  walletConnecting: boolean;
  setChangeNetworkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  homeConfig: BridgeConfig | undefined;
  accounts: Array<any> | undefined;
  selectAccount: any;
  address: string | undefined;
  dispatcher: any;
};

export default function HomeNetworkConnectView({
  isReady,
  accounts,
  address,

  classes,
  walletConnecting,
  walletType,

  homeConfig,

  setWalletType,
  setChangeNetworkOpen,
  selectAccount,
  dispatcher,
}: HomeNetworkConnectViewProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ConnectionDialog
        dispatcher={dispatcher}
        open={open}
        handleClose={handleClose}
      />
      <div className={classes.walletArea}>
        {!isReady && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius : '10px',
              height : '50px',
              fontWeight : 'bold',
              backgroundColor : '#2792d6',
              color : '#fff',
              fontSize : '15px',
              ":hover": {
                backgroundColor : '#2792d6',
                opacity: 0.9,}
            }}
            onClick={handleClickOpen}
          >
            <LoginIcon sx={{marginRight:'6px'}} /> Connect Wallet
          </Button>
        )}
        {isReady &&
          (walletConnecting ? (
            <section className={classes.connecting}>
              <Typography component="p" variant="h5">
                This app requires access to your wallet, <br />
                please login and authorize access to continue.
              </Typography>
            </section>
          ) : (
            <section className={classes.connected}>
              <div>
                <Typography  sx={{
                   marginTop : '20px',
                  color : "#b9c5cb", fontSize : '12px', 
                }}
              variant="body1">home network</Typography>
                {/* <Button   sx={{
                  backgroundColor : '#3a3d47',
                  color : '#fff',
                  ":hover": {
                    backgroundColor: "#4c4f5c",
                    opacity: 0.9,
                  },
                }}
                  className={classes.changeButton}
                  onClick={() => setChangeNetworkOpen(true)}
                >
                  <Rotate90DegreesCwOutlinedIcon fontSize="small"/>Change
                </Button> */}
              </div>
              <Typography  sx={{
                border :'1px solid #4c4f5c',
                borderRadius : '10px',
                  fontSize : '15px',
                  marginTop : '10px'
                }}
                component="h5"
                variant="h5"
                className={classes.networkName}
              >
                {homeConfig?.name}
              </Typography>
            </section>
          ))}
      </div>
    </>
  );
}
