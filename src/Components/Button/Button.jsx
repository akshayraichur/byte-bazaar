import PropTypes from "prop-types";
import { StyledButton } from "./Styles";

const Button = (props) => {
  const { variant, children, color } = props;
  return (
    <StyledButton variant={variant} color={color}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: "filled",
  color: "inherit",
};

export default Button;
