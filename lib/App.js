import React from 'react';
import { Button, Modal, FormGroup,
        FormControl, ControlLabel,
        InputGroup, ListGroup, ListGroupItem,
        ButtonToolbar } from 'react-bootstrap';

var shortid = require('shortid');

const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};

const createUniqueInputId = function() {
  return `input-${shortid.generate()}`;
}

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      showModal: false,
      data: [
        {
          name: "brownies",
          ingredients: ["dough", "chips"]
        },
        {
          name: "pizza",
          ingredients: ["crust", "toppings"]
        }
      ]
    },
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  close() {
    console.log("i'm in App.close")
    this.setState({ showModal: false })
  }
  open() {
    console.log("In App.open")
    this.setState({ showModal: true })
  }
  handleSubmit(input) {
    // input is a recipe object
    // console.log("App data is " + this.state);
    this.setState({
      showModal: false,
      data: this.state.data.concat(input)
    });
  }
  handleDelete(id) {
    console.log("in handleDelete");
    this.setState({ data: this.state.data.filter( (datum) => { return datum.name !== id })});
  }
  handleEdit(id) {
    // get data back
    // delete previous id and replace
    console.log("In App.handleEdit")
    this.setState({ data: this.state.data.filter( (datum) => { return datum.name !== id })});
    this.open();
  }
  render(){
    let rows = this.state.data.map( (recipe) => {
            return <RecipeCard key={recipe.name}
                               data={recipe}
                               onUserDelete={this.handleDelete}
                               onUserEdit={this.handleEdit} />
    });
    return(
      <div className="container">
       {rows}
       <InputGroup.Button>
         <button className="btn btn-primary" onClick={this.open}>New Recipe</button>
       </InputGroup.Button>
       <Modal show={this.state.showModal} onHide={this.close}>
         <NewRecipeForm onUserSubmit={this.handleSubmit}
                        onUserClose={this.close} />
       </Modal>
      </div>
    );
  }
}

class NewRecipeForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      inputs: { 'input-0' : ''}
    }
    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleChange(field, e) {
    // console.log("im in handlechange")
    // console.log("event: ", e.target.value, "field: ", field);
    if (field === "name") {
        this.setState({ name: e.target.value });
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    // console.log("inside handleSubmit: ", this.state.data);
    // put together new recipe object
    // send it back up to App
    let ingredients = Object.keys(this.state.inputs).map( (key) => {
      return this.state.inputs[key];
    })
    console.log(ingredients);
    let newRecipe = {
      name: this.state.name,
      ingredients: ingredients
    }
    this.props.onUserSubmit(newRecipe);
  }
  addInput() {
    console.log('In add input ' + JSON.stringify(this.state.inputs))
    let newInput = createUniqueInputId();
    let k = this.state.inputs;
    k[newInput] = "";
    // this.setState({ inputs: this.state.inputs.concat([newInput]) });
    this.setState({ inputs: k });
  }
  removeInput(elem) {
    console.log("inside remove input elem is " + elem)
    // let newInputs = this.state.inputs.filter( (input) => { return input !== elem });
    // console.log("new Inputs are: " + newInputs);
    let _inputs = this.state.inputs;
    console.log('currentInputs looks like: ' + _inputs);
    delete _inputs[elem];
    console.log(_inputs);
    this.setState({ inputs: _inputs});
  }
  handleInputChange(e, id) {
    let _inputs = this.state.inputs;
    _inputs[id] = e.target.value;
    this.setState({ _inputs });
    console.log(this.state.inputs[id]);
  }
  render() {
    // react does not want me to affect the state here
    let rows = Object.keys(this.state.inputs).map( (input) => {
        // console.log("NewRecipeForm Render is making a IngredientInput ", input , this.state.inputs.indexOf(input))
        return (
          <IngredientInput key={input}
                           id={input}
                           onUserRemove={this.removeInput}
                           onUserChange={this.handleInputChange}/>
        )
    });
    return(
        <form onSubmit={this.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <FormGroup controlId="formNewRecipe">
              <ControlLabel>
                Recipe Name
              </ControlLabel>
              <FormControl onChange={(e) => this.handleChange("name", e)}
                           type="text"
                           placeholder="ex. Pizza roll"/>
              {rows}
            </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addInput}>Add Ingredient</Button>
          <Button type="submit">Save</Button>
        </Modal.Footer>
        </form>
    )
  }
}

// the button in inputgroup is firing twice when instantiated?!?
const IngredientInput = (props) => {
    // console.log("In IngredientInput " + props.id);
    return (
      <div>
        <ControlLabel>
          Ingredient
        </ControlLabel>
        <InputGroup>
            <FormControl type="text"
                     placeholder="ex. Onions, Flour or Tomatoes"
                     onChange={(e) => props.onUserChange(e, props.id)}/>
                   <InputGroup.Button>
                     <Button onClick={() => props.onUserRemove(props.id)}>
                             &#x2715;
                     </Button>
                   </InputGroup.Button>
        </InputGroup>
      </div>
    )
}

class RecipeCard extends React.Component {
  constructor(props) {
    super();
    this.state = {active: false}
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    let newState = !this.state.active;
    this.setState({active: newState})
  }
  render() {
    let rows = this.props.data.ingredients.map( (ingredient) => {
            return <IngredientRow key={ingredient} data={ingredient} />
    });
    let styleSetting = this.state.active ?
          styles.active : styles.inactive
    return(
      <div className="recipeCard">
        <div className="titleContainer" onClick={this.toggle}>
          <p className="title" >{this.props.data.name}</p>
        </div>
        <div className="detailsContainer" style={styleSetting}>
          <p>Ingredient List</p>
          <hr />
          <ListGroup>
            {rows}
          </ListGroup>
          <ButtonToolbar>
            <Button onClick={() => this.props.onUserEdit(this.props.data.name)}
                    bsStyle="info">
              Edit
            </Button>
            <Button onClick={() => this.props.onUserDelete(this.props.data.name)}
                    bsStyle="danger">
              Delete
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    )
  }
}

const IngredientRow = (props) => {
    return(
        <ListGroupItem>{props.data}</ListGroupItem>
    )
}

export default App;
