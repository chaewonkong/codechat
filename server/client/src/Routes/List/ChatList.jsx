import React, { Component } from "react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = { nickname: this.props.location.state.nickname };
  }

  render() {
    return (
      <Container>
        <Link
          to={{
            pathname: "/chat",
            state: {
              nickname: this.state.nickname
            }
          }}
        >
          <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<p>{item.title}</p>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Link>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default ChatList;
