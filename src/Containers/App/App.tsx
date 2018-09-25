import * as React from 'react';
import { InputText } from '../../Components/InputText';

interface IState {
	value: string;
}

class App extends React.Component<{}, IState> {
	public state = {
		value: '',
	};

	public onChange = (value: string) => {
		this.setState({ value });
	};

	public render() {
		const { value } = this.state;
		return (
			<div>
				<div>hello world</div>
				<InputText name="input" label="label" value={value} onChange={this.onChange} />
			</div>
		);
	}
}

export default App;
