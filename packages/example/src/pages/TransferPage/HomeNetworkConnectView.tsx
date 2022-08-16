import React from "react";
import { SelectInput } from "@chainsafe/common-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { WalletType } from "@chainsafe/chainbridge-ui-core";
import { BridgeConfig } from "../../chainbridgeConfig";
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
}: HomeNetworkConnectViewProps) {
  return (
    <>
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
            onClick={() => {
              setWalletType("select");
            }}
          >
            <LoginIcon sx={{marginRight:'6px'}} />Connect Wallet
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
                <Typography sx={{
                   marginTop : '20px',
                  color : "#b9c5cb", fontSize : '12px', 
                }}
                 variant="body1">Home network</Typography>
                {/* <Typography
                  className={classes.changeButton}
                  variant="body1"
                  onClick={() => setChangeNetworkOpen(true)}
                >
                  Change
                </Typography> */}
              </div>
              <Typography sx={{
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
      {isReady &&
        walletType === "Substrate" &&
        accounts &&
        accounts.length > 0 && (
          <div>
            <section className={classes.accountSelector}>
              <SelectInput
                label="Select account"
                className={classes.generalInput}
                options={accounts.map((acc, i) => ({
                  label: acc.address,
                  value: i,
                }))}
                onChange={(value) => selectAccount && selectAccount(value)}
                value={accounts.findIndex((v) => v.address === address)}
                placeholder="Select an account"
              />
            </section>
          </div>
        )}
    </>
  );
}
