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
    const { nickname, comment } = this.state;
    return (
      <CommentContainer
        // actions={actions}
        align={this.props.align}
        author={<p>{nickname}</p>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={<p>{comment}</p>}
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

export default CommentCard;
