import React, { useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Typography, Button, ButtonProps } from "@mui/material";
import { MetamaskIcon } from "@fusion-icons/react/web3";
import styled from "styled-components";
import logo_metamask from '../../media/Icons/metamask.png';
export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
);

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
  useAccount,
} = hooks;

const ConnectToMetamask = ({
  dispatcher,
  handleClose,
  setIsLoading,
  isLoading,
}: {
  dispatcher: any;
  handleClose: any;
  isLoading: boolean;
  setIsLoading: any;
}) => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const account = useAccount();
  const error = useError();
  const isActivating = useIsActivating();
  const provider = useProvider();

  const isActive = useIsActive();

  useEffect(() => {
    setIsLoading(isActivating);
  }, [isActivating]);

  useEffect(() => {
    if (isActive) {
      dispatcher({
        type: "setAll",
        payload: {
          provider,
          accounts,
          isActive,
          chainId,
          address: account,
          walletType: "Ethereum"
        },
      });
      handleClose();
    }
  }, [isActive]);


  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#fff',
    textTransform : "capitalize" ,
    fontFamily : "Inter",
    fontWeight : "500",
    paddingLeft : "20px",
    paddingRight : "20px",
    // backgroundColor: "#3a3c48",
    borderColor : "#3a3c48",
    ':hover': {
      backgroundColor: "#3a3c48",
    },
  }));


  return (
    <ColorButton
      size="large"
      endIcon={
        <img src={logo_metamask} alt="Logo" />
      }
      variant="outlined"
      fullWidth

      sx={{  justifyContent: "space-between"}}
      onClick={() => {
        metaMask.activate();
      }}
    >
      {" "}
      metamask
    </ColorButton>
  );
};

export default ConnectToMetamask;
