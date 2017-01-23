class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
  }
  close() {
    this.setState({ showModal: false })
  }
  open() {
    this.setState({ showModal: true })
  }
  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        Wuuhhpah!
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return (
      <Modal show={this.state.showModal} onHode={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add RecipeCard()
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Put some forms here to add ingredients
        </Modal.Body>
        <Modal.Footer>
          <Button onClick=this.close>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}
