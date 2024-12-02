import React, { useEffect, useState } from "react";
import BackButton from "../BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import InventoryItem from "../InventoryItem/InventoryItem";
import "./inventory.css";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Inventory() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.userReducer);
  const inventory = useSelector((store) => store.inventory.inventory);
  const usersConsumableItems = useSelector(
    (store) => store.inventory.usersConsumableItems
  );
  const usersHeldItems = useSelector((store) => store.inventory.usersHeldItems);

  useEffect(() => {
    dispatch({ type: "SAGA_FETCH_IVENTORY" });
  }, []);

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Nav />

      <div className="inventory">

        <Box sx={{ width: "100%", }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", fontFamily: "New Super Mario Font U", }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="black"
              indicatorColor="primary"
              centered
              className="tabsButton"
            >
              <Tab
                label="Consumables"
                {...a11yProps(0)}
                disabled={usersConsumableItems.length === 0 ? true : false}
              />
              <Tab label="Inventory" {...a11yProps(1)} />
              <Tab
                label="Held Items"
                {...a11yProps(2)}
                disabled={usersHeldItems.length === 0 ? true : false}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="itemView">
              {usersConsumableItems.map((inventoryItem) => {
                return (
                  <div key={inventoryItem.id}>
                    <InventoryItem inventoryItem={inventoryItem} />
                  </div>
                );
              })}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="itemView">
              {inventory.length === 0 ? `go to the shop to get more items` : ""}
              {inventory.length === 0 ? (
                <button onClick={() => history.push(`/shop`)}>Shop</button>
              ) : (
                ""
              )}

              {inventory.map((inventoryItem) => {
                return (
                  <div key={inventoryItem.id}>
                    <InventoryItem inventoryItem={inventoryItem} />
                  </div>
                );
              })}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="itemView">
              {usersHeldItems.map((inventoryItem) => {
                return (
                  <div key={inventoryItem.id}>
                    <InventoryItem inventoryItem={inventoryItem} />
                  </div>
                );
              })}
            </div>
          </CustomTabPanel>
        </Box>

      </div>

      <BackButton />
    </div>
  );
}

export default Inventory;
