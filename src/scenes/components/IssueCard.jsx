// @flow
import React, { Component } from 'react';
import {
    Item,
    Image,
    Header,
    Icon
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import glamorous from 'glamorous';
import moment from 'moment';

type Props = {
    issue: Object
};

const UpdatedIcon = glamorous(Icon)({
    marginLeft: '.5em!important'
});

const StyledCard = glamorous(Item)({
    wordWrap: 'break-word',
    borderBottom: '1px solid #ccc',
    marginBottom: '2em',
    paddingBottom: '2em',
    ' img': {
        maxWidth: '100%'
    }
});

const H = glamorous(Header)({
    marginBottom: '1em!important',
    marginLeft: '-3.5em!important'
});

const Content = glamorous(Item.Content)({
    paddingLeft: '3.5em!important'
});

class MainContent extends Component<Props, any>{
    render(): any{
        const { issue } = this.props;

        return (
            <StyledCard color="blue">
                <Content>
                    <H as='h4' title={ issue.title }>
                        {
                            issue.user.avatar_url
                                && <Image circular src={ issue.user.avatar_url } />
                        }
                        <Header.Content>
                            <a href={ issue.html_url } tite={ issue.title } target="_blank">
                                { issue.title }
                            </a>
                            <Header.Subheader as="span">
                                <Icon name="user circle" />{ issue.user.login }
                                <UpdatedIcon name="calendar" />{ moment(issue.created_at).format('Do MMM[,] YYYY') }
                                <UpdatedIcon name="time" />{ moment(issue.updated_at).fromNow() }
                            </Header.Subheader>
                        </Header.Content>
                    </H>

                    <ReactMarkdown source={ issue.body || '*No description provided*' } />
                </Content>
            </StyledCard>
        );
    }
}

export default MainContent;
