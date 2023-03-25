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
      <Link to={`/Post`} style={{ textDecoration: "none" }}>
        <Card className="RequestCard" >
            <CardContent >
              <a>
                <CardMedia
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
        </Card>
      </Link>
      <Link to={`/Request`} style={{ textDecoration: "none" }}>
        <Card style={{marginTop: 20}} className="RequestCard">
          <Box>
            <CardContent >
              <a>
                <CardMedia
                  className="imageBell"
                  component="img"
                  image={Bell}
                  alt="Live from space album cover"
                  style={{ maxWidth: 80, maxHeight:100 , float: "left", marginRight: "2%", marginLeft: "2%", marginBottom: 10 }}
                />

                <Typography
                  variant={"h6"}
                  style={{
                    position: "relative",
                    top: "20px",
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
