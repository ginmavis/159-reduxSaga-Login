import React, { Component } from "react";
import {
	withStyles,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SignupPage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.background}>
				<div className={classes.signup}>
					<Card>
						<CardContent>
							<form>
								<div className="text-md-center pb-xs">
									<Typography variant="caption">
										Đăng kí để tiếp tục
									</Typography>
								</div>

								<TextField
									id="email"
									label="Email"
									className={classes.TextField}
									fullWidth
									margin="normal"
								/>

								<TextField
									id="password"
									label="Password"
									className={classes.TextField}
									fullWidth
									margin="normal"
									type="password"
								/>

								<TextField
									id="CPassword"
									label="Confirm Password"
									className={classes.TextField}
									fullWidth
									margin="normal"
									type="password"
								/>
								<FormControlLabel
									control={<Checkbox value="agree" />}
									label="Đã đọc và đồng ý điều khoản"
									className={classes.fullWidth}
								/>

								<Button
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								>
									Sign Up
								</Button>
								<div className="pt-1 text-md-center">
									<Link to="/login">
										<Button>Đã có tài khoản</Button>
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}
}

SignupPage.propTypes = {
	classes: PropTypes.object,
};
export default withStyles(styles)(SignupPage);
