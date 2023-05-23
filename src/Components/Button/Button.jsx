import PropTypes from "prop-types";
import { StyledButton } from "./Button.styles";
import Loading from "../Loading";

const Button = (props) => {
  const { variant, children, color, isLoading, small } = props;
  return (
    <StyledButton variant={variant} color={color} small={small} {...props}>
      {isLoading ? <Loading variant={variant} /> : children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  small: PropTypes.bool,
};

Button.defaultProps = {
  variant: "filled",
  color: "inherit",
  isLoading: false,
  small: false,
};

export default Button;
