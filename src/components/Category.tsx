import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import DemoImage from "../assets/images/prescription-bottle.jpg";
import { categories, items } from "../utils/constants";

export default function Category() {
  return (
    <Box mt={10} sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { sm: "180px" },
          flexShrink: { sm: 0 },
          display: { xs: "none", sm: "block" },
        }}
      >
        <List>
          {categories.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 180px)` },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {items.map((item, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="140" image={DemoImage} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      marginLeft: "auto",
                      width: "160px",
                    }}
                  >
                    <Link to="/details">
                      <Button variant="outlined" size="large">
                        Buy ${item.price}
                      </Button>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
