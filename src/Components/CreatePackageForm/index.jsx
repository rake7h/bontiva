import React, {useEffect} from 'react';
import {Form, FormField, TextInput, Box, Button, CheckBoxGroup,Select} from 'grommet';
import {createPackage, getAllWorkspaces} from '../../helpers/xhr';

const CreatePackageForm = () => {
	const [value, setValue] = React.useState({});
	const [workspaces, setWorkspaces] = React.useState([]);

	const handleSubmit = async (formData) => {
		// console.log('formData', formData)
		const out = await createPackage({
			name: formData.name,
			workspace: formData.workspace,
			options: formData.options,
		})
		setValue({})
		alert(out.stdout)
	};

	useEffect(()=>{
		const fetchData = async () =>{
			const w = await getAllWorkspaces();
			setWorkspaces(w);
		}
		fetchData();
	}, [])

	return (
		<Form
			value={value}
			onChange={(nextValue) => setValue(nextValue)}
			onReset={() => setValue({})}
			onSubmit={() => {
				handleSubmit(value);
			}}
		>
			<FormField name="name" htmlFor="text-input-id" label="Name">
				<TextInput id="text-input-id" name="name" />
			</FormField>
			<FormField name="workspace" htmlFor="text-input-workspace" label="workspace">
				<Select
					name="workspace"
					id="text-input-workspace"
					options={workspaces ||  []}
				/>
			</FormField>
			<FormField name="options" htmlFor="text-input-options" label="Options">
				<CheckBoxGroup
					id="text-input-options"
					name="options"
					options={[
						{label: 'ES Module', value:"es-module"},
						{label: 'other', disabled: true},
					]}
				/>
			</FormField>

			<Box direction="row" gap="medium">
				<Button type="submit" primary label="Create" />
				<Button type="reset" label="Reset" />
			</Box>
		</Form>
	);
};

export default CreatePackageForm;
