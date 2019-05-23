import React, { Component } from "react";
import { Input, Button, Layout } from "antd";
import styled from "styled-components";
import openSocket from "socket.io-client";
// import io from "socket.io-client";
import CommentCard from "../../Components/Comment";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

let path = window.location.toString();
if (path.match("localhost")) path = "http://localhost:5000";

// const socket = io.connect(path);
const socket = openSocket(path);

const { Footer } = Layout;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      comments: [],
      nickname: props.location.state.nickname,
      code: ""
    };
  }

  componentDidMount() {
    socket.on("chat message", ({ message, nickname }) => {
      this.setState({
        comments: [...this.state.comments, { nickname, message }]
      });
    });
    socket.on("code", ({ code, nickname }) => {
      this.setState({ code });
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

  handleCodeInput({ code }) {
    const { nickname } = this.state;
    // this.setState({
    //   code
    // });
    socket.emit("code", { code, nickname });
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
            <Editor
              value={this.state.code}
              onValueChange={code => this.handleCodeInput({ code })}
              highlight={code => highlight(code, languages.js)}
              padding={14}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                lineHeight: "1rem"
              }}
            />
          </CodeBox>
          <ChatBox>{this.renderComments()}</ChatBox>
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
  background: rgb(253, 246, 227);
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 4rem;
`;

const InputBox = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
`;
