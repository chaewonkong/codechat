import React, { Component } from "react";
import styled from "styled-components";
import { Comment, Icon, Tooltip, Avatar } from "antd";
import moment from "moment";

class CommentCard extends Component {
  constructor(props) {
    super(props);
    const { children, nickname } = props;
    this.state = { comment: children, nickname };
  }
  render() {
    console.log(this.props);
    const { nickname, comment } = this.state;
    return (
      <CommentContainer
        // actions={actions}
        align={this.props.align}
        author={this.props.align === "flex-start" ? <p>{nickname}</p> : null}
        avatar={
          this.props.align === "flex-start" ? (
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          ) : null
        }
        content={<Text align={this.props.align}>{comment}</Text>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}

const CommentContainer = styled(Comment)`
  display: flex;
  justify-content: ${props => props.align};
`;

const Text = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.align};
  max-width: 10rem;
  background: #eee;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  line-height: 1rem;
`;

export default CommentCard;
