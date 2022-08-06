import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

import Paper from "@mui/material/Paper";
import "../../app.css";
import {
  Switch,
  NavLink,
  Link,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AppHeader from "../AppHeader/AppHeader";
import { ReactComponent as GlobalSvg } from "../../media/Icons/tf.svg";
import { ReactComponent as GiftSvg } from "../../media/Icons/gift.svg";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ROUTE_LINKS } from "../../routes";
import { useStyles } from "./styles";
import { red } from "@mui/material/colors";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
  wrapTokenPage?: boolean;
}

const AppWrapper: React.FC<IAppWrapper> = ({
  children,
  wrapTokenPage,
}: IAppWrapper) => {
  const classes = useStyles();
  const [enableNavTabs, setEnableNavTabs] = useState(true);

  const location = useLocation();
  const history = useHistory();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  useEffect(() => {
    if (location.pathname.includes("/explorer") && !indexerEnabled) {
      history.push("/transfer");
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/explorer")) {
      return setEnableNavTabs(false);
    }
    return setEnableNavTabs(true);
  }, [location]);

  const routeMatch = useRouteMatch([ROUTE_LINKS.Transfer, ROUTE_LINKS.Wrap]);
  const currentTab = routeMatch?.path;
  return (
    <>
      {enableNavTabs ? (
        <div>
          <AppHeader />
          <Container  >
            <Paper
              sx={{
                tab:{
                  color : "#fff",
                },
                margin: `30px auto`,
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                px: 3,
                color : "#fff",
                fontFamily : "Fira Code",
                backgroundColor: "#1d1f24",
                borderRadius: "1.6rem",
                boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
              }}
              elevation={3}
            >
              {/* {enableNavTabs && (
                <Tabs value={currentTab}  >
                   <Tab sx={{color : '#acacac', fontWeight : '600'}}
                    icon={<GlobalSvg />}
                    iconPosition="start"
                    label="Swap"
                    value={ROUTE_LINKS.Wrap}
                    to={ROUTE_LINKS.Wrap}
                    component={Link}
                  />
                  <Tab sx={{color : '#acacac', fontWeight : '600'}}
                    icon={<WifiProtectedSetupIcon />}
                    iconPosition="start"
                    label="Bridge"
                    value={ROUTE_LINKS.Transfer}
                    to={ROUTE_LINKS.Transfer}
                    component={Link}
                  />
                 
                  {wrapTokenPage && (
                    <Tab sx={{color : '#acacac', fontWeight : '600'}}
                      icon={<GiftSvg />}
                      iconPosition="start"
                      label="Wrap"
                      value={ROUTE_LINKS.Wrap}
                      to={ROUTE_LINKS.Wrap}
                      component={Link}
                    />
                  )}
                </Tabs>
                
              )} */}
              <div className={classes.pageArea}>{children}</div>
            </Paper>
          </Container>

          {/* Put CTA here */}
          {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
        </div>
      ) : (
        <div className={classes.explorerMainContent}>
          <AppHeader />
          <div className={classes.explorerArea}>{children}</div>
        </div>
      )}
    </>
  );
};

export default AppWrapper;
