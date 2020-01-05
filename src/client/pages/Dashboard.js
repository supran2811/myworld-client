import React from 'react';
import { Box , Anchor, Grommet , Button } from 'grommet';
import AppBar from '../components/common/AppBar';

const Dashboard = (props) => {
    return (<Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
    <AppBar background="transparent">
          
    </AppBar>
    <div>
        My Dashboard
    </div>
</Box>)
}

export default { component :  Dashboard};