import React from 'react';
import '../style/formation.css';
import MainTitle from './mainTitle';
import Tuile from './tuile';
import Save from './save-button';
import IgForm from './ig-form';
import { verifyToken } from '../services/auth.service';
import { getIgElements, updateElementInIg } from '../services/ig.service';
import IgElem from '../models/igElem'

interface IState {
  activeElement: string,
  connected: boolean,
  mainText: string,
  title: string,
  id: number
}

interface IProps {

}

class FormationIg extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeElement: '',
      connected: false,
      mainText: '',
      title: '',
      id: -1
    };


    this.changeActiveElement = this.changeActiveElement.bind(this);
    this.renderText = this.renderText.bind(this);
    this.save = this.save.bind(this);
    this.showSavedButton = this.showSavedButton.bind(this);
    this.changeTitle = this.changeTitle.bind(this);

    const issues = verifyToken();
    issues.then((connectState) => {
      this.setState({ connected: connectState });
    });

    
  }

  componentDidMount() {
    const pageContent = getIgElements();
    pageContent.then((allElements: IgElem[]) => {
      if (allElements !== undefined) {
        this.setState({
          mainText: allElements[0].content,
          title: allElements[0].title,
          id: allElements[0].idIg
        });
      }
    });


  }


  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ mainText: event.target.value });
  }


  renderText() {
    if (this.state.connected) {
      return <textarea className='mainText' value={this.state.mainText} onChange={(event) => this.handleChange(event)} />;
    } else {
      return <span className='mainText'>{this.state.mainText}</span>;
    }
  }


  changeActiveElement(elem: string) {
    this.setState({ activeElement: elem });
  }

  showSavedButton() {
    if (this.state.connected) {
      return <Save save={this.save} />;
    }
  }

  save() {
    const elementIg = {
      idIg: this.state.id,
      title: this.state.title,
      content: this.state.mainText,
      media: ''
    };
    updateElementInIg(elementIg);
  }

  changeTitle(elem: string) {
    this.setState({title:elem});
  }

  render() {
    return (
      <div className="root">
        {this.showSavedButton()}
        <MainTitle name={this.state.title} connected={this.state.connected} action={this.changeTitle} />
        {this.renderText()}
        <div className="informations">
          <IgForm handleClick={this.changeActiveElement} />
          <Tuile name={this.state.activeElement} />
        </div>
      </div>
    );
  }

}

export default FormationIg;
