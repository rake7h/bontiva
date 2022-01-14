import React from 'react';
import {Grommet, Box, Grid, Header, Button, Menu} from 'grommet';

import { DiNpm } from "react-icons/di";

const PageHeader = () =>(
	<Header background="light-2" pad="small">
		<Button icon={<DiNpm />} size="large" hoverIndicator />
	</Header>
)

export default PageHeader;
