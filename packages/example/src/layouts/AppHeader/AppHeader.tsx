import React from "react";
import clsx from "clsx";
// import { Typography } from "@chainsafe/common-components";
import Typography from "@mui/material/Typography";
import { Switch, NavLink, Link, useRouteMatch } from "react-router-dom";

import { shortenAddress } from "../../utils/Helpers";
import { useChainbridge } from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";
import logo from '../../media/Icons/logo_ice_sm.png';
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { buttonUnstyledClasses, TabPanelUnstyled, TabsListUnstyled, TabsUnstyled, TabUnstyled, tabUnstyledClasses } from "@mui/base";
import styled from "styled-components";
import { ROUTE_LINKS } from "../../routes";

const ROUTE_LINKS_HEADERS = [
  { route: "/transfer", label: "TRANSFER" },
];

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useChainbridge();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  const hStyle = { color: '#fff', fontWeight:300, fontFamily : 'Fira Code',};
  const navStyle = { color: '#fff', fontWeight:600 };
  const navDivStyle = { backgroundColor : '#1d1f24', width :'200px', padding : '20px',borderRadius : '100px'};
  const subStyle = { fontSize:'10', color: '#fff', fontWeight:300, fontFamily : 'Fira Code',};
  const [value, setValue] = React.useState('one');

  const routeMatch = useRouteMatch([ROUTE_LINKS.Transfer, ROUTE_LINKS.Wrap]);
  const currentTab = routeMatch?.path;

  const black = {
    0 : '#ffffff',
    25 : '##93b8cb',
    50: '#babcc2',
    100: '#3a3c48',
    200: '#1d1f24',
  };
  const Tab = styled(props => <TabUnstyled {...props} />)`
    font-family:  Inter, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    fontSize : '16px';
    background-color: transparent;
    width: 70px;
    padding-top : 3px;
    margin: 6px 0px;
    border: none;
    border-radius: 12px;
    textDecoration: 'none'
    display: flex;
    justify-content: center;
    height : '5px';
    color : ${black[50]};
    &:hover {
      color: ${black[0]};
    }

    &.${tabUnstyledClasses.selected} {
      background-color: ${black[100]};
      color: ${black[0]};
      height : 30px;
      padding-top : 5px;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const TabsList =styled(props => <TabsListUnstyled {...props} />)`
    a {
      text-decoration: none;
      color : ${black[50]};
      &:hover {
        color: ${black[0]};
      }
    }
    min-width: 100px;
    height : 38px;
    background-color: ${black[200]};
    border-radius: 13px;
    margin-bottom: 16px;
    padding-left : 5px;
    padding-right : 5px;
    margin-top : 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
      <header className={clsx(classes.root)}>
        <div className={classes.left}>
          {<img src={logo} alt="Logo" />}
          {/* <div className={classes.logo}>
        </div> */}
          <div className={classes.mainTitle}>
            <Typography style={ hStyle } >ICECREAMSWAP</Typography>
          </div>
          {

            /* <div className={classes.headerLinks}>
              {indexerEnabled ? (
                ROUTE_LINKS_HEADERS.map(({ route, label }) => (
                  <NavLink to={route} className={classes.link} key={route}>
                    <Typography variant="body1" className={classes.linkTitle}>
                      {label}
                    </Typography>
                    <Typography variant="body1" className={classes.linkTitle}>
                      {label}
                    </Typography>
                  </NavLink>
                ))
              ) : (
                <NavLink style={ navDivStyle }
                  to={ROUTE_LINKS_HEADERS[0].route}
                  className={classes.link}
                  key={ROUTE_LINKS_HEADERS[0].route}
                >
                  <Typography  style={ navStyle } className={classes.linkTitle}>
                    {ROUTE_LINKS_HEADERS[0].label}
                  </Typography>
                </NavLink>
              )}
            </div> */
          }
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

          <TabsUnstyled defaultValue={currentTab}>
            <TabsList>
              <Tab>
                <a href="https://app.icecreamswap.com/#/swap"  rel="noreferrer">
                  Swap
                </a>
              </Tab>
              <Tab
                  value={ROUTE_LINKS.Transfer}
                  to={ROUTE_LINKS.Transfer}
                  component={Link}
              >
                Bridge</Tab>
            </TabsList>
          </TabsUnstyled>
        </Box>
        <section className={classes.state}>
          {!isReady ? (
              <Typography  style={ hStyle } variant="body1">No wallet connected</Typography>
          ) : (
              <>
                <div className={classes.mainInfo}>
                  <div className={classes.accountInfo}>
                    <span className={classes.indicator} />
                    <Typography  style={ subStyle }  className={classes.address}>
                      {address && shortenAddress(address)}
                    </Typography>
                  </div>
                  <Typography  style={ subStyle } className={classes.address}>
                    <div>
                      <span>connected to </span>
                      <span>
                    <strong>{homeConfig?.name}</strong>
                  </span>
                    </div>
                  </Typography>
                </div>
              </>
          )}
        </section>
      </header>
  );
};

export default AppHeader;
