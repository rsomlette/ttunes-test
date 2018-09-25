import * as React from 'react';

interface IProps {
	label: string;
	name: string;
	value?: string;
	onChange: (value: string, name: string) => void;
}

export class InputText extends React.Component<IProps, {}> {
	public handleOnChange = (event: any) => {
		const { onChange, name } = this.props;

		onChange(event.target.value, name);
	};

	public render() {
		const { label, value, name } = this.props;
		return (
			<label htmlFor={name}>
				<span>{label}</span>
				<input type="text" name={name} value={value} onChange={this.handleOnChange} />
			</label>
		);
	}
}
