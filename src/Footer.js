import React from 'react';
import Typography from '@material-ui/core/Typography';

export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={'footer'}>
                <Typography className={'pt-3'} style={{color: 'white'}}>Contact Us:</Typography>
                <div style={{display: 'flex', justifyContent: "space-around"}}>
                    <div>
                        <h6 className={'mb-0'}>Alex Wong:</h6>
                        <a href="mailto: alwong34@uw.edu">
                            <p className={'mb-1'}>alwong34@uw.edu</p>
                        </a>
                    </div>
                    <div>
                        <h6 className={'mb-0'}>Gavin Sreesangkom:</h6>
                        <a href="mailto: sreesg@uw.edu">
                            <p className={'mb-1'}>sreesg@uw.edu</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}