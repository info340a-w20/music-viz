import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SketchPicker } from 'react-color';

export class Controls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'d-flex flex-column'}>
                {/* <FormControl variant="filled" style={{width: '5rem', margin: '1.5rem'}}>
                    <InputLabel id="demo-simple-select-filled-label">Color</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={this.props.color}
                    onChange={(event) => {this.props.changeControls('color', event.target.value)}}
                    >
                        <MenuItem value="">Default</MenuItem>
                        <MenuItem value={'Red'}>Red</MenuItem>
                        <MenuItem value={'Orange'}>Orange</MenuItem>
                        <MenuItem value={'Yellow'}>Yellow</MenuItem>
                        <MenuItem value={'Green'}>Green</MenuItem>
                        <MenuItem value={'Blue'}>Blue</MenuItem>
                        <MenuItem value={'Purple'}>Purple</MenuItem>
                        <MenuItem value={'Pink'}>Pink</MenuItem>
                    </Select>
                </FormControl> */}
                {/* <SketchPicker className={'m-4'}/> */}
                <ColorPicker />
                <div className={'d-flex flex-column align-content-center m-4'}>
                    <Typography>Width</Typography>
                    <Slider style={{width: '15rem'}} min={1} max={10} step={.1} onChange={(event, newValue) => {this.props.changeControls('width', newValue)}} />
                </div>
            </div>
        )
    }
} 

export class ColorPicker extends React.Component {
    state = {
        barColor: "",
    };

    handleChangeComplete = (color) => {
        this.setState({barColor : color.hex})
    }

    render() {
        return (
            <SketchPicker className={'m-4'} color={this.state.barColor} onChangeComplete={this.handleChangeComplete} />
        )
    }
}