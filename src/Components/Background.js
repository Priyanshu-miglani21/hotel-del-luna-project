import styled from "styled-components";
import default_img from "../room/spacejoy-FX61rYaAfCQ-unsplash.jpg";

const Background = styled.div`
  background-image: url(${(props) => props.bg || default_img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: -85px;
`;

export default Background;
