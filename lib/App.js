import React from 'react';
import { Button } from 'react-bootstrap';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      active: false,
      data: [
        {
          name: "cat turd brownies",
          ingredients: ["brownies", "cat turds"]
        },
        {
          name: "pizza",
          ingredients: ["crust", "toppings"]
        }
      ]
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    let newState = !this.state.active
    this.setState({active: newState})
  }
  render(){
    let styleSetting = this.state.active ?
          styles.active : styles.inactive

    let rows = this.state.data.map( (recipe) => {
            return <RecipeCard key={recipe.indexOf} data={recipe} />
    });
    return(
      <div>
       {rows}
      </div>
    );
  }
}

const RecipeCard = (props) => {
  let rows = props.data.ingredients.map( (ingredient) => {
          return <tr>
                   <td>{ingredient}</td>
                 </tr>
  });
  return(
    <div>
      <a className="title" onClick={this.toggle}>{props.name}</a>
      <div className="details" style={styleSetting}>
        <p>Ingredient List</p>
        <hr />
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
