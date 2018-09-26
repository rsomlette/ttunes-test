import * as React from "react";
import { InputText } from "../../Components/InputText";
import { ResultItem } from "../../Components/ResultItem";
import { iTunesService } from "../../Services/ItunesService";

interface IState {
    data: any;
    value: string;
}

class App extends React.Component<{}, IState> {
    public state = {
        data: null,
        value: ""
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
            .search({ term: this.state.value, entity: "musicTrack" })
            .subscribe(this.saveResults, this.handleError);
    };

    public renderResults = (data: any) => {
        if (data === null) {
            return null;
        }
        return data.results.map((result: any) => (
            <ResultItem item={result} key={result.trackId} />
        ));
    };

    public render() {
        const { value, data } = this.state;
        return (
            <div>
                <form onSubmit={this.performSearch}>
                    <InputText
                        name="input"
                        label="enter artist"
                        value={value}
                        onChange={this.onChange}
                    />
                </form>
                {this.renderResults(data)}
            </div>
        );
    }
}

export default App;
