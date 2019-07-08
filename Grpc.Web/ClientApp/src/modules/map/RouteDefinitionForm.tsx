import * as React from 'react';


interface RouteDefinitionFormProps
{
    planets: string[],
}

interface RouteDefinitionFormState
{
    from: string,
    to: string
};

class RouteDefinitionForm extends React.Component<RouteDefinitionFormProps> {
    state: RouteDefinitionFormState;

    constructor(props:RouteDefinitionFormProps) {
        super(props);
        this.state = {from: props.planets[0], to: props.planets[1]};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.from);
        event.preventDefault();
      }

    render() {
        var planets = this.props.planets;
        return (<form className='form-inline'>
                    <div className='form-group mb-2'>
                        <label className='sr-only'>From</label>
                        <select value={this.state.from} onChange={this.handleChange}>
                            {planets.map(p=><option value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className='form-group mx-sm-3 mb-2'>
                        <label className='sr-only'>To</label>
                        <select value={this.state.to} onChange={this.handleChange}>
                            {planets.map(p=><option value={p}>{p}</option>)}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary mb-2'>Delivery</button>
                </form>);
    }
}

export default RouteDefinitionForm;

