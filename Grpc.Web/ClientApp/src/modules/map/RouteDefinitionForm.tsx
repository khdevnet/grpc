import * as React from 'react';
import * as MapActions from './reducers/mapReducerActionCreators';


export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}

interface RouteDefinitionFormProps {
    planets: string[];
    sendRoute: (from: string, to: string) => void;
}

interface RouteDefinitionFormState {
    values: IValues
};

class RouteDefinitionForm extends React.Component<RouteDefinitionFormProps> {
    state: RouteDefinitionFormState;

    constructor(props: RouteDefinitionFormProps) {
        super(props);
        this.state = { values: {} };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const target = event.currentTarget;
        if (target) {
            this.setState({ values: { [target.name]: target.value } });
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.props.sendRoute(this.state.values['from'], this.state.values['to']);
        event.preventDefault();
    }

    render() {
        var planets = this.props.planets;
        return (<form className='form-inline' onSubmit={this.handleSubmit}>
            <div className='form-group mb-2'>
                <label className='sr-only'>From</label>
                <select className='browser-default custom-select' name='from' value={this.state.values['from']} onChange={this.handleChange}>
                    {planets.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div className='form-group mx-sm-3 mb-2'>
                <label className='sr-only'>To</label>
                <select className='browser-default custom-select' name='to' value={this.state.values['to']} onChange={this.handleChange}>
                    {planets.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <button type='submit' className='btn btn-primary mb-2'>Delivery</button>
        </form>);
    }
}

export default RouteDefinitionForm;

