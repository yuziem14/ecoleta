import React from 'react';
import { IconType } from 'react-icons';

import './styles.css';

interface AlertProps {
  title: string;
  Icon: IconType;
}

const Alert: React.FC<AlertProps> = ({ title, Icon }) => (
  <main id="alert">
    <Icon />
    <h1>{title}</h1>
  </main>
);

export default Alert;
