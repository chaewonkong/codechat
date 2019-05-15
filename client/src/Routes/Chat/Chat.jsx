import React, { Component } from "react";
import { Input, Button, Layout } from "antd";
import styled from "styled-components";
import io from "socket.io-client";
import CommentCard from "../../Components/Comment";

const socket = io.connect("http://localhost:5000");

const { Footer } = Layout;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      comments: [],
      nickname: props.location.state.nickname
    };
  }

  componentDidMount() {
    socket.on("chat message", ({ message, nickname }) => {
      this.setState({
        comments: [...this.state.comments, { nickname, message }]
      });
    });
  }

  handleSubmitMessage() {
    const { nickname, message } = this.state;
    socket.emit("chat message", { nickname, message });
    this.setState({ message: "" });
  }

  handleTextInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  renderComments() {
    const { comments } = this.state;
    return comments.map(({ message, nickname }, idx) => (
      <CommentCard
        key={idx}
        nickname={nickname}
        align={this.state.nickname === nickname ? "flex-end" : "flex-start"}
      >
        {message}
      </CommentCard>
    ));
  }

  render() {
    return (
      <Container>
        <ChatBox align={"flex-start"}>{this.renderComments()}</ChatBox>
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
  width: 80%;
`;

const InputBox = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
`;
