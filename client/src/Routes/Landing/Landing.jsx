import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

export default class Landing extends Component {
  constructor() {
    super();
    this.state = { nickname: "" };
  }

  onTextChange = e => {
    this.setState({
      nickname: e.target.value
    });
  };

  render() {
    return (
      <Container>
        <InputBox>
          <Title level={2} type="secondary">
            chat chat!
          </Title>
          <StyledInput
            placeholder="Nickname"
            allowClear
            onChange={this.onTextChange}
          />
          <Link to="/chat">
            <StyledButton>Start Chat!</StyledButton>
          </Link>
        </InputBox>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 8rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 0.3rem;
  width: 8rem;
`;
