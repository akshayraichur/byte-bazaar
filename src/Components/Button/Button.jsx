import PropTypes from "prop-types";
import { StyledButton } from "./Button.styles";
import Loading from "../Loading";

const Button = (props) => {
  const { variant, children, color, isLoading } = props;
  return (
    <StyledButton variant={variant} color={color} {...props}>
      {isLoading ? <Loading variant={variant} /> : children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  variant: "filled",
  color: "inherit",
  isLoading: false,
};

export default Button;
