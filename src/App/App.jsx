import {hot} from 'react-hot-loader/root';
import React, {useState} from 'react';
import {Grommet, Box, Grid} from 'grommet';
import Container from '@material-ui/core/Container';
import CreatePackageForm from '../Components/CreatePackageForm';
import PackageList from '../Components/Packages/PackageList';
import PageHeader from '../Components/PageHeader';

const theme = {
	global: {
		font: {
			family: 'Roboto',
			size: 'contain',
		},
	},
};

export function App() {
	const [pkgOut, setpkgOut] = useState('');

	const packageCreateCB = (out) =>{
		setpkgOut(JSON.stringify(out.stdout.split(/  +/), undefined, 2));
	}

	return (
		<Grommet theme={theme}>
			<Container>
				<PageHeader />
				<Box>
					<PackageList />
				</Box>
				<Grid
					columns={{
						count: 2,
						size: 'auto',
					}}
					gap="small"
				>
					<Box width="medium">
						<CreatePackageForm onPackageCreate={packageCreateCB} />
					</Box>
					<Box>{pkgOut}</Box>
				</Grid>
			</Container>
		</Grommet>
	);
}

export default hot(App);
