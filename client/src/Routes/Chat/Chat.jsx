import React, { Component } from "react";
import { Input, Button, Layout } from "antd";
import styled from "styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const { Footer } = Layout;

export default class Chat extends Component {
  constructor() {
    super();
    this.state = { message: "", dialogs: [] };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      this.setState({
        dialogs: [...this.state.dialogs, msg]
      });
    });
  }

  handleSubmitMessage() {
    socket.emit("chat message", this.state.message);
    this.setState({ message: "" });
  }

  handleTextInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  renderDialogs() {
    const { dialogs } = this.state;
    return dialogs.map((msg, idx) => <p key={idx}>{msg}</p>);
  }

  render() {
    return (
      <Container>
        <ChatBox>{this.renderDialogs()}</ChatBox>
        <InputBox>
          <Input
            value={this.state.message}
            allowClear
            name="message"
            onChange={e => this.handleTextInput(e)}
            onPressEnter={() => this.handleSubmitMessage()}
          />
          <Button onClick={() => this.handleSubmitMessage()}>Send</Button>
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
  flex-direction: column;
`;

const InputBox = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
`;
