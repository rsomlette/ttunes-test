import * as React from 'react';
import { InputText } from '../../Components/InputText';
import { iTunesService } from '../../Services/ItunesService';

interface IState {
	data: any;
	value: string;
}

class App extends React.Component<{}, IState> {
	public state = {
		data: null,
		value: '',
	};

	public onChange = (value: string) => {
		this.setState({ value });
	};

	public saveResults = (response: any) => {
		this.setState({ data: response.data });
	};

	public handleError = (error: Error) => {
		/* tslint:disable */
		console.error(error);
		/* tslint:enable */
	};

	public performSearch = (e: any) => {
		e.preventDefault();

		iTunesService
			.search({ term: this.state.value })
			.then(this.saveResults)
			.catch(this.handleError);
	};

	public render() {
		const { value } = this.state;
		return (
			<div>
				<div>hello world</div>
				<form onSubmit={this.performSearch}>
					<InputText name="input" label="label" value={value} onChange={this.onChange} />
				</form>
			</div>
		);
	}
}

export default App;
