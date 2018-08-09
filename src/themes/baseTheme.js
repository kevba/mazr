import {createMuiTheme} from '@material-ui/core/styles';

import teal from '@material-ui/core/colors/teal';

import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: teal,
    },
});

export default theme;
