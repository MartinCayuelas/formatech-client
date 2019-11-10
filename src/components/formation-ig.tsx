import React from 'react';
import '../style/formation.css';
import MainTitle from './mainTitle';
import Tuile from './tuile';
import IgForm from './ig-form';
import { verifyToken } from '../services/auth.service';

const fakeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel odio erat. Integer pharetra dui sit amet mauris hendrerit, id faucibus lectus lobortis. Vestibulum efficitur ultrices enim eget congue. Donec porta, nunc a facilisis mollis, erat eros vulputate tortor, et maximus urna urna vel justo. Etiam blandit massa eget tincidunt hendrerit. ';

interface IState {
  activeElement: string,
  connected: boolean
}

interface IProps {

}

class FormationIg extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeElement: '',
      connected: false
    };
    this.changeActiveElement = this.changeActiveElement.bind(this);
    const issues = verifyToken();
    issues.then((connectState) => {
      this.setState({ connected: connectState });
    });
  }

  changeActiveElement(elem: string) {
    this.setState({ activeElement: elem });
  }

  render() {
    return (
      <div className="root">
        <MainTitle name="Informatique et Gestion" connected={this.state.connected} />
        <span className='mainText'>{fakeText}</span>
        <div className="informations">
          <IgForm handleClick={this.changeActiveElement} />
          <Tuile name={this.state.activeElement} />
        </div>
      </div>
    );
  }

}

export default FormationIg;
