// @flow
import React, { Component, type Element } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Header as SHeader } from 'semantic-ui-react';
import moment from 'moment';
import glamorous from 'glamorous';

import { getApiLimits } from 'apiLimits/selectors';
import Header from './Header';
import MainContent from './MainContent';

type Props = {
    limitReached: boolean,
    resetTime: number,
    error: ?string
};

const ErrorWrapper = glamorous.section({
    display: 'flex',
    alignItems: 'center',
    minHeight: '40vh',
    justifyContent: 'center'
});

const ErrorBox = glamorous.div({
    display: 'inherit',
    textAlign: 'center',
    padding: '2em 10em',
    background: '#f15151',
    color: '#fff',
    border: '1px solid #d83a3a'
});

class AppWrapper extends Component<Props>{
    render(): Element<'Dimmer.Dimmable'>{
        return (
            <React.Fragment>
                <Dimmer.Dimmable as='section' dimmed={ this.props.limitReached }>
                    <Dimmer active={ this.props.limitReached }>
                        <SHeader as='h2' inverted>
                            API Limit Reached!<br />
                            Resets at { moment.unix(this.props.resetTime).format('HH:mm [hrs], Do MMM YY') }
                        </SHeader>
                    </Dimmer>

                    <Header title="Enter GitHub username" placeholder="GitHub username..." />
                </Dimmer.Dimmable>

                {
                    this.props.error == null
                        ? <MainContent />
                        : (
                            <ErrorWrapper>
                                <ErrorBox>
                                    { this.props.error }
                                </ErrorBox>
                            </ErrorWrapper>
                        )
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    limitReached: getApiLimits(state).remaining === 0,
    resetTime: getApiLimits(state).reset,
    error: state.ui.error
});

// $FlowFixMe
export default connect(mapStateToProps)(AppWrapper);
