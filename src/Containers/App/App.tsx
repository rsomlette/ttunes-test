import * as React from "react";
import { InputText } from "../../Components/InputText";
import { ResultItem } from "../../Components/ResultItem";
import { ItunesResponse, ItunesResult } from "../../Models/ItunesResult";
import { iTunesService } from "../../Services/ItunesService";

interface IState {
    data: ItunesResponse | null;
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

    public saveResults = (data: ItunesResponse) => {
        this.setState({ data });
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

    public renderResults = (data: ItunesResponse | null) => {
        if (data === null) {
            return null;
        }

        return data.results.map((result: ItunesResult) => (
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
