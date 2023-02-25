import * as React from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Car from "../images/car.png";
import Bell from "../images/bell.png";
import { Typography } from "@material-ui/core";

export default function Dialog(props) {
  return (
    <>
      <Link to={`/Post`}>
        <Card>
          <Box>
            <CardContent xs={12} sm={12} md={6}>
              <a>
                <CardMedia
                  className="image"
                  component="img"
                  image={Car}
                  alt="Live from space album cover"
                  style={{ maxWidth: 100, float: "left", marginRight: "2%" }}
                />

                <Typography
                  variant={"h6"}
                  style={{
                    position: "relative",
                    top: "30px",
                    left: "20px",
                    color: "black",
                  }}
                >
                  Driving, Want to make friends!
                </Typography>
              </a>
            </CardContent>
          </Box>
        </Card>
      </Link>
      <Link to={`/Request`}>
        <Card style={{marginTop: 10}}>
          <Box>
            <CardContent xs={12} sm={12} md={6}>
              <a>
                <CardMedia
                  className="image"
                  component="img"
                  image={Bell}
                  alt="Live from space album cover"
                  style={{ maxWidth: 80, float: "left", marginRight: "2%", marginLeft: "2%", marginBottom: 10 }}
                />

                <Typography
                  variant={"h6"}
                  style={{
                    position: "relative",
                    top: "30px",
                    left: "20px",
                    color: "black",
                  }}
                >
                  Need a ride from a trusted uw fellow?
                </Typography>
              </a>
            </CardContent>
          </Box>
        </Card>
      </Link>
    </>
  );
}
