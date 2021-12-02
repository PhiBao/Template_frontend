/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postProviderLogin } from "../redux/actions/login";
import { openMessage } from "../redux/actions/message";
import { setAuthToken } from "../utils/helpers";
import styled from "styled-components";
import { Box, Typography, Grid } from "@mui/material";
import { categories } from "../utils/constants";

export default function Home() {
  const dispatch = useDispatch();

  const callApiProviderLogin = async () => {
    try {
      const response = await dispatch(postProviderLogin());
      setAuthToken(response);
    } catch (error) {
      console.log(error);
      dispatch(
        openMessage({
          title: "Something went wrong, please try again!",
          type: "error",
        })
      );
    }
  };

  React.useEffect(() => {
    callApiProviderLogin();
  }, []);

  return (
    <React.Fragment>
      <Box m={10}>
        <Typography variant="h3" gutterBottom component="div">
          Welcome to E-Meds Online
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Pick a category to get started
        </Typography>
      </Box>
      <Box m={10}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {categories.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item}>
              <Link to="/category">
                <Item>{item}</Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

const Item = styled.div`
  padding: 30px 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  border: solid 1px;
  border-color: rgba(0, 0, 0, 0.6);
`;
