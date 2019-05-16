import React, { Component } from "react";
import { Input, Button, Layout } from "antd";
import styled from "styled-components";
import io from "socket.io-client";
import CommentCard from "../../Components/Comment";
import Highlight from "react-highlight.js";

const socket = io.connect("http://localhost:5000");

const { Footer } = Layout;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      comments: [],
      nickname: props.location.state.nickname,
      code: [`const highlight = () => console.log("it works")`]
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

  handleCodeInput(e) {
    this.setState({
      code: [...this.state.code, e.target.value]
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
        <ConA>
          <CodeBox>
            <Highlight language="javascript">
              {this.state.code.map(block => (
                <p>{block}</p>
              ))}
            </Highlight>
            <CodeInput onPressEnter={e => this.handleCodeInput(e)} allowclear />
          </CodeBox>
          <ChatBox align={"flex-start"}>{this.renderComments()}</ChatBox>
        </ConA>
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
  width: 100%;
  height: 100%;
`;

const ConA = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`;

const CodeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #232323;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CodeInput = styled(Input)`
  background: #232323;
  color: white;
  border: none;
  margin: none;
  border-radius: 0;
`;

const InputBox = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
`;
