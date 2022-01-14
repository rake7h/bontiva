import React, {useEffect} from 'react';
import { FitAddon } from 'xterm-addon-fit';

import { XTerm } from 'xterm-for-react'

const XtermBox = ({text}) => {
	const xtermRef = React.useRef(null)
	const fitAddon = new FitAddon();

	useEffect(() => {
		// You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
		xtermRef.current.terminal.writeln(text || "")
		fitAddon.fit();
	}, [text])

	return (
	// Create a new terminal and set it's ref.
		<XTerm
			ref={xtermRef}
			addons={[fitAddon]}
		/>
	)
}

export default XtermBox;
