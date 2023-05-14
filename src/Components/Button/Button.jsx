import PropTypes from "prop-types";
import { StyledButton } from "./Styles";

const Button = (props) => {
  const { variant, children } = props;
  return <StyledButton variant={variant}>{children}</StyledButton>;
};

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: "filled",
};

export default Button;
