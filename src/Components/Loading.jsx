import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLoading = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: inline-block;
  vertical-align: top;

  #loader-1 path,
  #loader-1 rect {
    fill: ${(props) => (props.variant === "outlined" ? props.theme.colors.text : "white")};
  }
`;

const Loading = (props) => {
  return (
    <StyledLoading className="loader loader--style3" title="2" variant={props?.variant}>
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="25px"
        height="25px"
        viewBox="0 0 50 50"
        // style="enable-background:new 0 0 50 50;"
        xmlSpace="preserve"
      >
        <path
          fill="#000"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </StyledLoading>
  );
};

Loading.propTypes = {
  variant: PropTypes.string,
};

Loading.defaultProps = {
  variant: "",
};

export default Loading;
