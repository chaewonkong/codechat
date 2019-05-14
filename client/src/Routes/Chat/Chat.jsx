import React, { Component } from "react";
import { Input, Button, Layout } from "antd";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const { Footer } = Layout;

export default class Chat extends Component {
  render() {
    return (
      <Container>
        <ChatBox />
        <InputBox>
          <Input allowClear />
          <Button>Send</Button>
        </InputBox>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatBox = styled.div`
  display: flex;
`;

const InputBox = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
`;
